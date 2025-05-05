export const formatEmail = (template, recipientData) => {
  let formattedEmail = template;
  Object.keys(recipientData).forEach((key) => {
    const placeholder = `{${key}}`;
    formattedEmail = formattedEmail.replaceAll(placeholder, recipientData[key] || '');
  });
  return formattedEmail;
};