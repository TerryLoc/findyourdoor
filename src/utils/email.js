import emailjs from 'emailjs-com';

export const createSubmissionDate = () =>
  new Date().toLocaleDateString('en-IE', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });

const getEmailConfig = () => ({
  serviceId: import.meta.env.VITE_EMAILJS_SERVICE_ID,
  notifyTemplateId: import.meta.env.VITE_EMAILJS_TEMPLATE_NOTIFY,
  replyTemplateId: import.meta.env.VITE_EMAILJS_TEMPLATE_REPLY,
  publicKey: import.meta.env.VITE_EMAILJS_PUBLIC_KEY,
});

const assertEmailConfig = (emailConfig) => {
  const missingConfig = Object.entries(emailConfig)
    .filter(([, value]) => !value)
    .map(([key]) => key);

  if (missingConfig.length) {
    throw new Error(
      `Missing EmailJS configuration: ${missingConfig.join(', ')}`
    );
  }
};

export const createEmailTemplateData = ({
  fromName,
  fromEmail,
  message,
  interestType,
  sourcePage,
}) => ({
  from_name: fromName,
  from_email: fromEmail,
  name: fromName,
  email: fromEmail,
  to_name: fromName,
  to_email: fromEmail,
  reply_to: fromEmail,
  message,
  interest_type: interestType,
  source_page: sourcePage,
  title: interestType,
  date: createSubmissionDate(),
});

export const sendContactEmail = async (templateData) => {
  const emailConfig = getEmailConfig();
  assertEmailConfig(emailConfig);

  await emailjs.send(
    emailConfig.serviceId,
    emailConfig.notifyTemplateId,
    templateData,
    emailConfig.publicKey
  );

  try {
    await emailjs.send(
      emailConfig.serviceId,
      emailConfig.replyTemplateId,
      templateData,
      emailConfig.publicKey
    );
  } catch (autoReplyError) {
    console.warn('EmailJS auto-reply failed:', autoReplyError);
  }
};
