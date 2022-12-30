const twilio = require("twilio");

module.exports.sendSms = (PATIENT_PHONE, DOCTOR_NAME, STATUS) => {
  const client = new twilio(
    process.env.TWILIO_SID,
    process.env.TWILIO_AUTH_TOKEN
  );
  return client.messages
    .create({
      body: `From:Hospital-API. report is successfully created. Kindly visits our center to collect report.we found that you are ${STATUS}. Consulted doctor: DR.${DOCTOR_NAME}`,
      from: process.env.TWILIO_PHONE,
      to: `+91${PATIENT_PHONE}`,
    })
    .then((message) => console.log("message sends"))
    .catch((err) => console.log(err, "message not send"));
};
