const fs = require("fs");
const nodemailer = require("nodemailer");
const config = require("../config/config");

// const transporter = nodemailer.createTransport({
//   service: "gmail",
//   auth: {
//     user: "morecreate.emails@gmail.com",
//     pass: "morecreate123!@#",
//   },
//   logger: true,
//   debug: true,
// });

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: config.nodemailer.id,
    pass: config.nodemailer.password,
  },
  logger: true,
  debug: true,
});

function replaceAll(str, find, replace) {
  var escapedFind = find.replace(/([.*+?^=!:${}()|\[\]\/\\])/g, "\\$1");
  return str.replace(new RegExp(escapedFind, "g"), replace);
}
const sendLoginDetails = async (body) => {
  const linkToLogin = config.mail.url;
  const recipents = body.user.email;
  const sendingMail = config.mail.mail;
  const message =
    "<style>tr,td {border:solid 3px #000000} </style> <h3 style='text-align:center;'>" +
    "LOGIN DETAILS" +
    "</h3><hr><p>" +
    "<a href=" +
    linkToLogin +
    "/" +
    body.tokens.access.token +
    ">Tap here to login.! </a>" +
    "</p>";
  const mailOptions = {
    from: sendingMail,
    to: recipents,
    subject: "Login to Kamui",
    html: message,
  };

  const response = await transporter.sendMail(mailOptions, async (err, data) => {
    if (err) {
      console.log(err);
      return "mail not sent";
    }
    console.log(data, "<==== data");
    return "mail sent";
  });
};

// const sendFile = async (files, body) => {
//   const recipents = body.recipients;
//   const sendingMail = "morecreate.emails@gmail.com";

//   const messageForClient = body.body;
//   let attachment = [];
//   //   for (let index = 0; index < files.length; index++) {
//   const element = {
//     filename: files.orignalname + ".zip",
//     content: fs.createReadStream(files.path),
//   };
//   attachment.push(element);
//   //   }
//   //   console.log(attachment);

//   const mailOptions = {
//     from: sendingMail,
//     to: recipents,
//     subject: body.subject,
//     html: messageForClient,
//     attachments: attachment,
//   };

//   await transporter.sendMail(mailOptions, function (err, data) {
//     if (err) {
//       console.log(err);
//     } else {
//       //   for (let index = 0; index < deletePath.length; index++) {
//       //     const element = deletePath[index];
//       //     fs.unlink(element, (err) => {
//       //       if (err) {
//       //         console.log(err);
//       //       }
//       //     });
//       //   }
//       fs.unlink(files.path, (err) => {
//         if (err) {
//           console.log(err);
//         }
//         return "mail Sent";
//       });
//     }
//     return "mail Sent";
//   });
// };

const suggestion = async (body) => {
  console.log(body);

  const recipents = body.recipents;
  const sendingMail = body.email;
  let test = await replaceAll(body.message, "&lt;", "<");
  const mailOptions = {
    from: sendingMail,
    to: recipents,
    subject: body.subject,
    html: test,
  };

  await transporter.sendMail(mailOptions, async (err, data) => {
    if (err) {
      console.log(err);
      return "mail not sent";
    }
    console.log(data, "<==== data");
    return "mail sent";
  });
};

const forgotPasswordThroughNodeMailer = (body) => {
  const message =
    "<p>Your Verification Code is " +
    body.token +
    ". Kindly do not disclose your Verification Code to others for your own security. If you didnt request a password change then kindly ignore this message.</p> ";

  const data = {
    from: config.nodemailer.id,
    to: body.email,
    subject: "Password Reset",
    html: message,
  };

  transporter.sendMail(data, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });
};

const purchaseMail = async (body) => {
  console.log(body, "<================PURCHASE BODY");

  const sendingMail = "info@superduperacademy.com";
  let myString = "<tr><th>Name</th><th>Quantity</th><th>Price</th><th>Total</th></tr>";
  for (let index = 0; index < body.productDetails.length; index++) {
    const product = body.productDetails[index];
    myString = myString.concat(
      "<tr><td style='border: 1px solid'>" +
        product.name +
        "</td><td style='border: 1px solid'>" +
        body.products[index].quantity +
        "</td><td style='border: 1px solid'>" +
        product.price +
        "</td><td style='border: 1px solid'>" +
        body.products[index].quantity * product.price +
        "</td></tr>"
    );
  }

  const messageForCustomer =
    "<p>Thank you " +
    body.userDetails[0].email +
    " for choosing Kamui, your order is accepted</p><br><h2 style='text-align:center;'>Purchase Details</h2><div><table style='border: 1px solid  #000000; width: 100%;align-item:center '" +
    "<tr><td>Order ID</td><td>" +
    body._id +
    "</td></tr><tr><td>email</td><td>" +
    body.userDetails[0].email +
    "</td></tr></table><h3 style='text-align:center;'>Order Details</h3><br><table style='border: 1px solid  #000000; width: 100%;'" +
    myString +
    "<tr><th style='border: 1px solid' colspan='3'>total</th><td style='border: 1px solid'>" +
    body.subtotal +
    "</td></tr><tr><th style='border: 1px solid' colspan='3'>Delivery Charges</th><td style='border: 1px solid'>" +
    body.delivery +
    "</td></tr><tr><th style='border: 1px solid' colspan='3'>Taxes</th><td style='border: 1px solid'>" +
    body.tax +
    "</td></tr><tr><th style='border: 1px solid' colspan='3'>Total</th><th style='border: 1px solid'>" +
    body.total +
    "</th></tr><tr><th style='border: 1px solid' colspan='3'>Payment Method</th><td style='border: 1px solid'>" +
    body.paymentMethod +
    "</td></tr></table></div>";

  const mailOptions = {
    from: sendingMail,
    to: body.userDetails[0].email,
    subject: "Order Accepted at Kamuistre",
    html: messageForCustomer,
  };

  transporter.sendMail(mailOptions, function (err, data) {
    if (err) {
      console.log(err);
    } else {
      return { message: "email sent" };
    }
    return "mail Sent";
  });

  // const messageForClient =
  //   "<h2 style='text-align:center;'>Order Details</h2><div><table style='border: 1px solid  #000000; width: 100%;align-item:center '" +
  //   "<tr><td>Order ID</td><td>" +
  //   body.id +
  //   "</td></tr><tr><td>Payment Method</td><td>" +
  //   body.paymentMethod +
  //   "</td></  tr><tr><td>Price</td><td>" +
  //   body.classId.price +
  //   "$</td></tr><tr><td>Customer Name</td><td>" +
  //   body.fullName +
  //   "$</td></tr><tr><td>Customer's Child Name</td><td>" +
  //   body.childName +
  //   "</td></tr><tr><td>Class ID</td><td>" +
  //   body.classId.id +
  //   "</td></tr></table><h3 style='text-align:center;'>Class Details</h3><br><table style='border: 1px solid  #000000; width: 100%;align-item:center '" +
  //   "<tr><td>Activity</td><td>" +
  //   body.classId.activity +
  //   "</td></tr><tr><td>Start Date</td><td>" +
  //   body.classId.startDate +
  //   "</td></tr><tr><td>Class Duration </td><td>" +
  //   body.classId.classDurationWeeks +
  //   " week" +
  //   "</td></tr><tr><td>Assigned Coach</td><td>" +
  //   body.classId.assignedCoach +
  //   "</td></tr><tr><td>Day/s</td><td>" +
  //   body.classId.clientDays +
  //   "</td></tr><tr><td>Timings</td><td>" +
  //   body.classId.clientTimeWindow +
  //   "</td></tr><tr><td>Class Age Group</td><td>" +
  //   body.classId.ageGroup +
  //   "</td></tr></table></div>";

  // const mailOptionsForClient = {
  //   from: sendingMail,
  //   to: recipents,
  //   subject: body.email + " has purchased a class at SuperDuperAcademy",
  //   html: messageForClient,
  // };

  // transporter.sendMail(mailOptionsForClient, function (err, data) {
  //   if (err) {
  //     console.log(err);
  //   } else {
  //     console.log(data);
  //     return { message: "email sent" };
  //   }
  //   return "mail Sent";
  // });
};

module.exports = {
  suggestion,
  sendLoginDetails,
  forgotPasswordThroughNodeMailer,
  purchaseMail,
};
