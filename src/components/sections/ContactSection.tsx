/* eslint-disable @typescript-eslint/no-unused-vars */
'use client';

import { useState } from 'react';
import { Form, Input, message } from 'antd';
import { Mail, Phone, MapPin, CheckCircle, MessageCircle, Loader } from 'lucide-react';
import { saveContactMessage, type ContactFormData } from '../../firebaseConfig';
import SectionHeading from '@/components/ui/SectionHeading';

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

export default function ContactSection() {
  const [form] = Form.useForm();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();

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
      messageApi.success('Message sent successfully! I\'ll get back to you soon.');
      setIsSubmitted(true);
      form.resetFields();

      setTimeout(() => setIsSubmitted(false), 5000);
    } else {
      throw new Error('Failed to save to Firebase');
    }
  } catch (error) {
    console.error('Error saving message:', error);
    messageApi.error('Failed to send message. Please try again.');
  } finally {
    setIsSubmitting(false);
  }
};

  const onFinishFailed = (errorInfo: unknown) => {
    console.log('Failed:', errorInfo);
    messageApi.error('Please fill in all required fields correctly.');
  };

  return (
    <section id="contact" className="py-20 px-4 sm:px-6 lg:px-8 relative">
      {contextHolder}
      <div className="max-w-7xl mx-auto">
        <SectionHeading
          titleClassName="gradient-text-reverse"
          subtitle={
            <>
              Have a project in mind or want to collaborate? I&apos;d love to hear from you. Let&apos;s create
              something amazing together!
            </>
          }
        >
          Get In Touch
        </SectionHeading>

        <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 sm:gap-12 max-w-6xl mx-auto">
          <div className="flex flex-col">
            <h3 className="text-xl sm:text-2xl font-bold text-[#4fc1c6] mb-6 sm:mb-8">
              Let&apos;s Connect
            </h3>

            <div className="space-y-4 sm:space-y-6 mb-6 sm:mb-8">
              {contactInfo.map((info) => (
                <a
                  key={info.title}
                  href={info.link}
                  target={info.link.startsWith('http') ? '_blank' : undefined}
                  rel={info.link.startsWith('http') ? 'noopener noreferrer' : undefined}
                  className="flex items-center space-x-4 p-4 sm:p-5 bg-[#0f1117] border border-[#1f222e] rounded-xl hover:border-[#4fc1c6]/40 hover:scale-[1.01] transition-all duration-300 group w-full"
                >
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg bg-[#1a232c] flex items-center justify-center group-hover:bg-[#4fc1c6]/20 transition-all flex-shrink-0 border border-[#2a3441] group-hover:border-[#4fc1c6]/50">
                    <info.icon className="text-[#4fc1c6]" size={20} />
                  </div>
                  <div className="min-w-0 flex-1">
                    <h4 className="text-white font-semibold text-sm sm:text-base mb-0.5">{info.title}</h4>
                    <p className="text-gray-400 group-hover:text-gray-300 transition-colors text-sm sm:text-base break-words">
                      {info.value}
                    </p>
                  </div>
                </a>
              ))}
            </div>

            {/* Additional Info */}
            <div className="p-5 sm:p-6 bg-[#0f1117] rounded-xl border border-[#1f222e] mt-auto">
              <h4 className="text-base sm:text-lg font-semibold text-[#4fc1c6] mb-2 sm:mb-3">
                Quick Response Promise
              </h4>
              <p className="text-gray-400 text-xs sm:text-sm leading-relaxed">
                I typically respond to all inquiries within 24 hours. For urgent matters,
                feel free to reach out via phone or connect with me on social media for
                a faster response.
              </p>
            </div>
          </div>

          {/* Contact Form */}
          <div>
            <div className="bg-[#0f1117] border border-[#1f222e] rounded-xl p-6 sm:p-8 shadow-2xl">
              <h3 className="text-xl sm:text-2xl font-bold text-white mb-6 sm:mb-8">
                Send Me a Message
              </h3>

              {isSubmitted ? (
                <div className="text-center py-8 sm:py-12">
                  <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-green-500/20 flex items-center justify-center mx-auto mb-4 border border-green-500/30 animate-pulse">
                    <CheckCircle className="text-green-500" size={32} />
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold text-white mb-2">
                    Message Sent!
                  </h3>
                  <p className="text-gray-400 text-sm sm:text-base">
                    Thank you for reaching out. I'll get back to you soon!
                  </p>
                </div>
              ) : (
                <Form
                  form={form}
                  layout="vertical"
                  onFinish={onFinish}
                  onFinishFailed={onFinishFailed}
                  requiredMark={(label, { required }) => (
                    <span className="flex items-center gap-1">
                      {required && <span className="text-red-500">*</span>}
                      {label}
                    </span>
                  )}
                  className="space-y-5"
                >
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <Form.Item
                      name="name"
                      label={<span className="text-gray-200 text-sm">Name</span>}
                      rules={[
                        { required: true, message: 'Please enter your name' },
                        { min: 2, message: 'Name must be at least 2 characters' }
                      ]}
                      className="mb-0"
                    >
                      <Input
                        placeholder="Your full name"
                        size="large"
                        className="bg-[#0a0c10] border-[#1f222e] text-white hover:border-[#4fc1c6] focus:border-[#4fc1c6] rounded-lg py-2.5"
                      />
                    </Form.Item>

                    <Form.Item
                      name="email"
                      label={<span className="text-gray-200 text-sm">Email</span>}
                      rules={[
                        { required: true, message: 'Please enter your email' },
                        { type: 'email', message: 'Please enter a valid email' }
                      ]}
                      className="mb-0"
                    >
                      <Input
                        placeholder="your.email@example.com"
                        size="large"
                        className="bg-[#0a0c10] border-[#1f222e] text-white hover:border-[#4fc1c6] focus:border-[#4fc1c6] rounded-lg py-2.5"
                      />
                    </Form.Item>
                  </div>

                  <Form.Item
                    name="subject"
                    label={<span className="text-gray-200 text-sm">Subject</span>}
                    rules={[
                      { required: true, message: 'Please enter a subject' },
                      { min: 5, message: 'Subject must be at least 5 characters' }
                    ]}
                    className="mb-0"
                  >
                    <Input
                      placeholder="What's this about?"
                      size="large"
                      className="bg-[#0a0c10] border-[#1f222e] text-white hover:border-[#4fc1c6] focus:border-[#4fc1c6] rounded-lg py-2.5"
                    />
                  </Form.Item>

                  <Form.Item
                    name="message"
                    label={<span className="text-gray-200 text-sm">Message</span>}
                    rules={[
                      { required: true, message: 'Please enter your message' },
                      { min: 10, message: 'Message must be at least 10 characters' }
                    ]}
                    className="mb-6"
                  >
                    <TextArea
                      placeholder="Tell me about your project or just say hello!"
                      rows={5}
                      className="bg-[#0a0c10] border-[#1f222e] text-white hover:border-[#4fc1c6] focus:border-[#4fc1c6] rounded-lg py-2.5"
                    />
                  </Form.Item>

                  <Form.Item className="mb-0 mt-8">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className={`group relative overflow-hidden px-6 py-3 rounded-xl bg-gradient-to-r from-[#4fc1c6] to-[#15232d] text-white font-semibold transition-all duration-300 hover:shadow-[0_0_20px_rgba(79,193,198,0.2)] w-full h-12 text-base flex items-center justify-center space-x-2 hover:scale-[1.01] active:scale-[0.98] ${isSubmitting ? 'opacity-70 cursor-not-allowed' : ''}`}
                    >
                        <div className="absolute inset-0 bg-gradient-to-r from-[#4fc1c6] to-[#1b3140] opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                        <div className="relative flex items-center justify-center space-x-2">
                          {isSubmitting ? (
                            <>
                              <Loader size={18} className="animate-spin" />
                              <span>Sending...</span>
                            </>
                          ) : (
                            <>
                              <MessageCircle size={18} />
                              <span>Send Message</span>
                            </>
                          )}
                        </div>
                    </button>
                  </Form.Item>
                </Form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}