/* eslint-disable @typescript-eslint/no-unused-vars */
'use client';

import { motion, useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { Form, Input, Button, message, Card } from 'antd';
import { Mail, Phone, MapPin, Send, CheckCircle, MessageCircle, Loader } from 'lucide-react';
import { saveContactMessage, type ContactFormData } from '../../firebaseConfig';

const { TextArea } = Input;

type ContactForm = ContactFormData;

const contactInfo = [
  {
    icon: Mail,
    title: 'Email',
    value: 'chirag.work@gmail.com',
    link: 'mailto:chirag.work@gmail.com'
  },
  {
    icon: Phone,
    title: 'Phone',
    value: '+91 9054332757',
    link: 'tel:+15551234567'
  },
  {
    icon: MapPin,
    title: 'Location',
    value: 'Ahmedabad, India',
    link: 'https://maps.google.com/?q=San+Francisco,CA'
  }
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.3,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
  },
};

export default function ContactSection() {
  const [form] = Form.useForm();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [messageSuccess, isMessageSuccess] = message.useMessage();

const onFinish = async (values: ContactForm) => {
  setIsSubmitting(true);

  try {
    // Save to Firebase
    const result = await saveContactMessage(values);

    try {
      const res = await fetch('https://formsubmit.co/ajax/12chiragprajapati12@gmail.com', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json', 'X-Requested-With': 'XMLHttpRequest' },
        body: JSON.stringify({
          name: values.name,
          email: values.email,
          // From: `${values.name} <${values.email}>`,
          Subject: values.subject,
          Message: values.message,
          'Submitted At': new Date().toLocaleString(undefined, { dateStyle: 'medium', timeStyle: 'short' }),
          // 'Page URL': typeof window !== 'undefined' ? window.location.href : '',
          Browser: typeof navigator !== 'undefined' ? navigator.userAgent : '',
          _subject: `🔔 New Message from ${values.name}: ${values.subject}`,
          _replyto: values.email,
          _template: 'table',
          _autoresponse: `Hi ${values.name},\n\nThanks for reaching out! I received your message about: ${values.subject}.\n\nI'll get back to you soon.\n\n— Chirag`
        })
      });
      if (!res.ok) {
        const text = await res.text();
        console.warn('FormSubmit error', res.status, text);
      } else {
        const data = await res.json().catch(() => ({}));
        console.log('FormSubmit response', data);
      }
    } catch (emailErr) {
      console.warn('Email send failed', emailErr);
    }

    if (result.success) {
      console.log('Form submitted to Firebase:', values);
      messageSuccess.success('Message sent successfully! I\'ll get back to you soon.');
      setIsSubmitted(true);
      form.resetFields();

      setTimeout(() => setIsSubmitted(false), 5000);
    } else {
      throw new Error('Failed to save to Firebase');
    }
  } catch (error) {
    console.error('Error saving message:', error);
    messageSuccess.error('Failed to send message. Please try again.');
  } finally {
    setIsSubmitting(false);
  }
};

  const onFinishFailed = (errorInfo: unknown) => {
    console.log('Failed:', errorInfo);
    message.error('Please fill in all required fields correctly.');
  };

  return (
    <section id="contact" className="py-20 px-4 sm:px-6 lg:px-8 relative">
      <motion.div
        ref={ref}
        className="max-w-7xl mx-auto"
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
      >
        <motion.div className="text-center mb-16" variants={itemVariants}>
          <h2 className="text-4xl sm:text-5xl font-bold gradient-text-reverse mb-4">
            Get In Touch
          </h2>
          <div className="w-24 h-1 bg-[#4fc1c6] mx-auto rounded-full" />
          <p className="text-gray-400 mt-6 max-w-2xl mx-auto">
            Have a project in mind or want to collaborate? I&apos;d love to hear from you.
            Let&apos;s create something amazing together!
          </p>
        </motion.div>

        <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 sm:gap-12">
          <motion.div variants={itemVariants}>
            <h3 className="text-xl sm:text-2xl font-bold gradient-text mb-6 sm:mb-8">
              Let&apos;s Connect
            </h3>

            <div className="space-y-4 sm:space-y-6 mb-6 sm:mb-8">
              {contactInfo.map((info, index) => (
                <motion.a
                  key={info.title}
                  href={info.link}
                  target={info.link.startsWith('http') ? '_blank' : undefined}
                  rel={info.link.startsWith('http') ? 'noopener noreferrer' : undefined}
                  className="flex items-center space-x-3 sm:space-x-4 p-3 sm:p-4 glass rounded-lg border border-gray-700 hover:border-[#4fc1c6] transition-all duration-300 group w-full"
                  whileHover={{ scale: 1.01 }} // Reduced scale for mobile
                  initial={{ opacity: 0, x: -10 }} // Reduced translation
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: index * 0.2 + 0.5 }}
                >
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg bg-[#4fc1c6] bg-opacity-20 flex items-center justify-center group-hover:bg-opacity-30 transition-all flex-shrink-0">
                    <info.icon className="text-[#4fc1c6]" size={20} />
                  </div>
                  <div className="min-w-0 flex-1">
                    <h4 className="text-white font-semibold text-sm sm:text-base">{info.title}</h4>
                    <p className="text-gray-400 group-hover:text-[#4fc1c6] transition-colors text-sm sm:text-base break-words">
                      {info.value}
                    </p>
                  </div>
                </motion.a>
              ))}
            </div>

            {/* Additional Info */}
            <motion.div
              className="p-4 sm:p-6 glass rounded-lg border border-gray-700"
              variants={itemVariants}
            >
              <h4 className="text-base sm:text-lg font-semibold text-[#4fc1c6] mb-2 sm:mb-3">
                Quick Response Promise
              </h4>
              <p className="text-gray-300 text-xs sm:text-sm leading-relaxed">
                I typically respond to all inquiries within 24 hours. For urgent matters,
                feel free to reach out via phone or connect with me on social media for
                a faster response.
              </p>
            </motion.div>
          </motion.div>

          {/* Contact Form */}
          <motion.div variants={itemVariants}>
            <Card
              className="bg-gray-900 border-gray-700"
              title={
                <span className="text-white text-lg sm:text-xl font-bold">
                  Send Me a Message
                </span>
              }
            >
              {isSubmitted ? (
                <motion.div
                  className="text-center py-8 sm:py-12"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5 }}
                >
                  <motion.div
                    className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-green-500 bg-opacity-20 flex items-center justify-center mx-auto mb-4"
                    animate={{
                      scale: [1, 1.1, 1],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: 'easeInOut',
                    }}
                  >
                    <CheckCircle className="text-green-500" size={32} />
                  </motion.div>
                  <h3 className="text-xl sm:text-2xl font-bold text-white mb-2">
                    Message Sent!
                  </h3>
                  <p className="text-gray-400 text-sm sm:text-base">
                    Thank you for reaching out. I&apos;ll get back to you soon!
                  </p>
                </motion.div>
              ) : (
                <Form
                  form={form}
                  layout="vertical"
                  onFinish={onFinish}
                  onFinishFailed={onFinishFailed}
                  className="space-y-4"
                >
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <Form.Item
                      name="name"
                      label={<span className="text-white text-sm sm:text-base">Name</span>}
                      rules={[
                        { required: true, message: 'Please enter your name' },
                        { min: 2, message: 'Name must be at least 2 characters' }
                      ]}
                    >
                      <Input
                        placeholder="Your full name"
                        size="large"
                        className="bg-gray-800 border-gray-600 text-white"
                      />
                    </Form.Item>

                    <Form.Item
                      name="email"
                      label={<span className="text-white text-sm sm:text-base">Email</span>}
                      rules={[
                        { required: true, message: 'Please enter your email' },
                        { type: 'email', message: 'Please enter a valid email' }
                      ]}
                    >
                      <Input
                        placeholder="your.email@example.com"
                        size="large"
                        className="bg-gray-800 border-gray-600 text-white"
                      />
                    </Form.Item>
                  </div>

                  <Form.Item
                    name="subject"
                    label={<span className="text-white text-sm sm:text-base">Subject</span>}
                    rules={[
                      { required: true, message: 'Please enter a subject' },
                      { min: 5, message: 'Subject must be at least 5 characters' }
                    ]}
                  >
                    <Input
                      placeholder="What's this about?"
                      size="large"
                      className="bg-gray-800 border-gray-600 text-white"
                    />
                  </Form.Item>

                  <Form.Item
                    name="message"
                    label={<span className="text-white text-sm sm:text-base">Message</span>}
                    rules={[
                      { required: true, message: 'Please enter your message' },
                      { min: 10, message: 'Message must be at least 10 characters' }
                    ]}
                  >
                    <TextArea
                      placeholder="Tell me about your project or just say hello!"
                      rows={5}
                      className="bg-gray-800 border-gray-600 text-white"
                    />
                  </Form.Item>

                  <Form.Item>
                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <motion.button
                        type="submit" 
                        disabled={isSubmitting}
                        className={`group relative overflow-hidden px-6 py-2 rounded-full bg-gradient-to-r from-accent text-white font-semibold transition-all duration-300 hover:shadow-lg hover:shadow-accent/50 focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 focus:ring-offset-gray-900 w-full h-11 sm:h-12 text-base sm:text-lg ${isSubmitting ? "opacity-70 cursor-not-allowed" : ""
                          }`}
                        whileHover={{
                          boxShadow: '0 10px 30px rgba(79, 193, 198, 0.4)'
                        }}
                        whileTap={{ scale: 0.98 }}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5 }}
                      >
                        {/* Background glow effect */}
                        <div className="absolute inset-0 bg-gradient-to-r from-accent to-accent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                        <div className="relative flex items-center justify-center space-x-2">
                          {isSubmitting ? (
                            <>
                              <Loader size={18} className="animate-spin" />
                              <span>Sending...</span>
                            </>
                          ) : (
                            <>
                              <MessageCircle size={20} />
                              <span>Send Message</span>
                            </>
                          )}
                        </div>

                        {/* Shimmer effect */}
                        <div className="absolute inset-0 -top-[2px] -bottom-[2px] bg-gradient-to-r from-transparent via-white/30 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                      </motion.button>
                    </motion.div>
                  </Form.Item>
                </Form>
              )}
            </Card>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}