import React, { useEffect, useRef, useState } from 'react';
import classes from './contact-form.module.css';
import Notification from '../ui/notification';

export const ContactForm = () => {
	const formRef = useRef();
	const [requestStatus, setRequestStatus] = useState(); // 'pending', 'success', 'error'

	useEffect(() => {
		if (requestStatus === 'success' || requestStatus === 'error') {
			const timer = setTimeout(() => {
				setRequestStatus(null);
			}, 3000);

			return () => clearTimeout(timer);
		}
	}, [requestStatus]);

	const submitFormHandler = async (event) => {
		event.preventDefault();

		const email = formRef.current.querySelector('#email').value;
		const name = formRef.current.querySelector('#name').value;
		const message = formRef.current.querySelector('#message').value;

		setRequestStatus('pending');
		try {
			const response = await fetch('/api/contact', {
				method: 'POST',
				body: JSON.stringify({ email, name, message }),
				headers: {
					'Content-Type': 'application/json'
				}
			});

			const data = await response.json();

			if (!response.ok) {
				throw new Error(data.message || 'Something went wrong!');
			}

			setRequestStatus('success');
			setTimeout(() => {
				formRef.current.querySelector('#email').value = '';
				formRef.current.querySelector('#name').value = '';
				formRef.current.querySelector('#message').value = '';
			}, 2000);
		} catch (error) {
			setRequestStatus('error');

			return;
		}
	};

	let notificationData;

	if (requestStatus === 'pending') {
		notificationData = {
			title: 'Sending message...',
			message: 'Your message is on its way!',
			status: 'pending'
		};
	} else if (requestStatus === 'success') {
		notificationData = {
			title: 'Success!',
			message: 'Message sent successfully!',
			status: 'success'
		};
	} else if (requestStatus === 'error') {
		notificationData = {
			title: 'Error!',
			message: 'Message sending failed!',
			status: 'error'
		};
	}

	return (
		<section className={classes.contact}>
			<h1>How can I help you?</h1>
			<form
				className={classes.form}
				ref={formRef}
				onSubmit={submitFormHandler}
			>
				<div className={classes.controls}>
					<div className={classes.control}>
						<label htmlFor='email'>Your Email</label>
						<input
							type='email'
							id='email'
							required
						/>
					</div>
					<div className={classes.control}>
						<label htmlFor='name'>Your Name</label>
						<input
							type='text'
							id='name'
							required
						/>
					</div>
				</div>
				<div className={classes.control}>
					<label htmlFor='message'>Your Message</label>
					<textarea
						id='message'
						rows='5'
						required
					></textarea>
				</div>
				<div className={classes.actions}>
					<button>Send Message</button>
				</div>
			</form>
			{requestStatus && <Notification {...notificationData} />}
		</section>
	);
};
