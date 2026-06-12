'use client';

import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Form, Input, message } from 'antd';
import { MessageCircle, Loader } from 'lucide-react';
import { saveContactMessage } from '@/firebaseConfig';

const { TextArea } = Input;

export default function ContactSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const blobRef = useRef<HTMLDivElement>(null);
  const blobWrapRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const leftTextRef = useRef<HTMLDivElement>(null);
  const formContainerRef = useRef<HTMLDivElement>(null);

  const [form] = Form.useForm();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();

  const [isClient, setIsClient] = useState(false);

  const onFinish = async (values: any) => {
    setIsSubmitting(true);
    try {
      // Save to Firebase
      const result = await saveContactMessage(values);
      try {
        const res = await fetch('https://formsubmit.co/ajax/12chiragprajapati12@gmail.com', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'X-Requested-With': 'XMLHttpRequest',
          },
          body: JSON.stringify({
            name: values.name,
            email: values.email,
            Subject: values.subject,
            Message: values.message,
            'Submitted At': new Date().toLocaleString(undefined, {
              dateStyle: 'medium',
              timeStyle: 'short',
            }),
            Browser: typeof navigator !== 'undefined' ? navigator.userAgent : '',
            _subject: `🔔 New Message from ${values.name}: ${values.subject}`,
            _replyto: values.email,
            _template: 'table',
            _autoresponse: `Hi ${values.name},\n\nThanks for reaching out! I received your message about: ${values.subject}.\n\nI'll get back to you soon.\n\n— Chirag`,
          }),
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
        messageApi.success("Message sent successfully! I'll get back to you soon.");
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

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
    messageApi.error('Please fill in all required fields correctly.');
  };

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (!isClient) return;

    const isMobile = window.innerWidth <= 768;

    if (isMobile) {
      if (blobWrapRef.current) blobWrapRef.current.style.display = 'none';
      const bg = document.getElementById('contact-bg');
      if (bg) bg.style.display = 'none';
      gsap.set([blobRef.current, titleRef.current, leftTextRef.current, formContainerRef.current], {
        clearProps: 'all',
      });
      if (leftTextRef.current) gsap.set(leftTextRef.current, { opacity: 1, y: 0 });
      if (formContainerRef.current) gsap.set(formContainerRef.current, { opacity: 1, y: 0 });
      return;
    }

    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // Toggle visibility of contact layers
      ScrollTrigger.create({
        trigger: '#contact',
        start: 'top bottom',
        endTrigger: '#footer',
        end: 'bottom bottom',
        onEnter: () => {
          if (blobWrapRef.current) blobWrapRef.current.style.visibility = 'visible';
          const bg = document.getElementById('contact-bg');
          if (bg) bg.style.display = 'block';
        },
        onLeave: () => {
          if (blobWrapRef.current) blobWrapRef.current.style.visibility = 'hidden';
          const bg = document.getElementById('contact-bg');
          if (bg) bg.style.display = 'none';
        },
        onLeaveBack: () => {
          if (blobWrapRef.current) blobWrapRef.current.style.visibility = 'hidden';
          const bg = document.getElementById('contact-bg');
          if (bg) bg.style.display = 'none';
        },
        onEnterBack: () => {
          if (blobWrapRef.current) blobWrapRef.current.style.visibility = 'visible';
          const bg = document.getElementById('contact-bg');
          if (bg) bg.style.display = 'block';
        },
      });

      if (blobWrapRef.current) {
        blobWrapRef.current.style.visibility = 'hidden';
      }

      // Master scrubbing timeline
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: '#contact',
          start: 'top bottom',
          end: 'bottom bottom',
          scrub: true,
        },
      });

      // Scale up the beautiful white blob background
      tl.fromTo(
        blobRef.current,
        { scale: 0 },
        { scale: 1, duration: 0.6, ease: 'none' },
        0
      );

      // Hide the scroll timeline markers on entry
      tl.to(['#scroll-timeline', '#scroll-pct'], { opacity: 0, duration: 0.08 }, 0.1);

      // Title slides in from the right edge
      gsap.set(titleRef.current, {
        yPercent: 0,
        x: () => window.innerWidth * 1.1,
      });
      tl.to(
        titleRef.current,
        {
          x: 0,
          duration: 0.3,
          ease: 'power3.out',
        },
        0.18
      );


      // Reveal left-side collaborative text
      tl.fromTo(
        leftTextRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.25, ease: 'power2.out' },
        0.28
      );

      // Reveal contact form
      tl.fromTo(
        formContainerRef.current,
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 0.25, ease: 'power2.out' },
        0.32
      );
    }, containerRef);

    return () => ctx.revert();
  }, [isClient]);

  if (!isClient) return null;

  return (
    <div ref={containerRef}>
      {contextHolder}
      <div className="contact-bg" id="contact-bg" />
      
      <div className="contact-blob-wrap" id="contact-blob-wrap" ref={blobWrapRef}>
        <div className="contact-blob" id="contact-blob" ref={blobRef} />
      </div>

      <section className="contact" id="contact">
        <div className="contact-pin" id="contact-pin">
          <div className="contact-title" id="contact-title" ref={titleRef}>
            Contact
          </div>

          <div className="contact-left-text" id="contact-left-text" ref={leftTextRef}>
            <p>
              If you have any query or want to collaborate, please fill out this form and reach out to us. Let's build something exceptional together.
            </p>
          </div>


          {/* Premium Light-Glassmorphic Contact Form */}
          <div className="contact-form-wrap" ref={formContainerRef}>
            {isSubmitted ? (
              <div className="contact-form-success">
                <div className="success-icon-wrap">
                  <svg className="success-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <polyline points="20 6 9 17 4 12"></polyline>
                  </svg>
                </div>
                <h3>Message Sent!</h3>
                <p>Thank you for reaching out. I'll get back to you soon!</p>
              </div>
            ) : (
              <Form
                form={form}
                layout="vertical"
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                requiredMark={(label, { required }) => (
                  <span className="flex items-center gap-1">
                    {required && <span className="text-[#ff1e00]">*</span>}
                    {label}
                  </span>
                )}
                className="space-y-4"
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Form.Item
                    name="name"
                    label={<span className="form-label">Name</span>}
                    rules={[
                      { required: true, message: 'Please enter your name' },
                      { min: 2, message: 'Name must be at least 2 characters' }
                    ]}
                    className="mb-0"
                  >
                    <Input
                      placeholder="Your name"
                      size="large"
                      className="form-input"
                    />
                  </Form.Item>

                  <Form.Item
                    name="email"
                    label={<span className="form-label">Email</span>}
                    rules={[
                      { required: true, message: 'Please enter your email' },
                      { type: 'email', message: 'Please enter a valid email' }
                    ]}
                    className="mb-0"
                  >
                    <Input
                      placeholder="Your email"
                      size="large"
                      className="form-input"
                    />
                  </Form.Item>
                </div>

                <Form.Item
                  name="subject"
                  label={<span className="form-label">Subject</span>}
                  rules={[
                    { required: true, message: 'Please enter a subject' },
                    { min: 5, message: 'Subject must be at least 5 characters' }
                  ]}
                  className="mb-0"
                >
                  <Input
                    placeholder="Subject"
                    size="large"
                    className="form-input"
                  />
                </Form.Item>

                <Form.Item
                  name="message"
                  label={<span className="form-label">Message</span>}
                  rules={[
                    { required: true, message: 'Please enter your message' },
                    { min: 10, message: 'Message must be at least 10 characters' }
                  ]}
                  className="mb-4"
                >
                  <TextArea
                    placeholder="Tell me about your project or say hello..."
                    rows={4}
                    className="form-input form-textarea"
                  />
                </Form.Item>

                <Form.Item className="mb-0">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`form-submit-btn ${isSubmitting ? "loading" : ""}`}
                  >
                    {isSubmitting ? (
                      <>
                        <Loader size={16} className="animate-spin" />
                        <span>Sending...</span>
                      </>
                    ) : (
                      <>
                        <MessageCircle size={16} />
                        <span>Send Message</span>
                      </>
                    )}
                  </button>
                </Form.Item>
              </Form>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}