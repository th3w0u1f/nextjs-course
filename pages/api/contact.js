import { MongoClient } from 'mongodb';

async function connectDB() {
	const connectionString = `mongodb+srv://${process.env.mongodb_username}:${process.env.mongodb_password}@${process.env.mongodb_clustername}.vmx1r.mongodb.net/${process.env.mongodb_database}?retryWrites=true&w=majority&appName=Cluster0`;
	// connect to the database
	const client = await MongoClient.connect(connectionString);

	return client;
}

async function handler(req, res) {
	let dbClient;
	try {
		dbClient = await connectDB();
	} catch (error) {
		res.status(500).json({ message: 'Connecting to the database failed!' });
		return;
	}

	if (req.method === 'POST') {
		const { email = '', name = '', message = '' } = req.body;
		if (!email || !email.includes('@') || !name || name.trim() === '' || !message || message.trim() === '') {
			res.status(422).json({ message: 'Invalid input.' });
			return;
		}
		// Store it in a database
		const newMessage = {
			email,
			name,
			message
		};

		const db = dbClient.db('my-site');
		let result;
		try {
			result = await db.collection('messages').insertOne(newMessage);
			newMessage.id = result.insertedId;
		} catch (error) {
			client.close();
			res.status(500).json({ message: 'Storing message failed!' });
			return;
		}

		res.status(201).json({ message: 'Successfully stored message!', message: newMessage });

		dbClient.close();
	}
}

export default handler;
