import Head from 'next/head';
import { ContactForm } from '../components/contact-form/contact-form';

function ContactPage() {
	return (
		<main>
			<Head>
				<title>Contact Me</title>
				<meta
					name='description'
					content='Send me your messages!'
				/>
			</Head>
			<ContactForm />
		</main>
	);
}

export default ContactPage;
