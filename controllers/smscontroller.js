const fast2sms = require("fast-two-sms");
const otpGenerator = require('otp-generator');
let OTP = "";
const AUTHORISATION_CODE = process.env.AUTHORISATION_CODE;

// const sendsmspostrequestcontroller = async(req, res)=>{
//     try{
//         const {user, phone} = req.body;
//         console.log(user);
//         OTP = otpGenerator.generate(6, { upperCaseAlphabets: false, specialChars: false });
//         const options= {
//             authorization : AUTHORISATION_CODE,
//             message : `Hello ${user} Your OTP is ${OTP}`,
//             numbers : [phone]
//         };
//         console.log(options);
//         fast2sms.sendMessage(options).then((response)=>{
//             console.log(response);
//             if(response){
//                 res.status(200).send({
//                     success : true,
//                     message : `OTP sent to your mobile number ${phone}`
//                 })
//             }else{
//                 res.status(200).send({
//                     success : false,
//                     message : `Failed to send the OTP`
//                 })
//             }
//         }).catch((err)=>{
//             res.status(200).send({
//                 success : false,
//                 message : `Failed to send the OTP`,
//                 error : err
//             })
//         });
//     }catch(err){
//         res.status(500).send({
//             success : false,
//             message : "Internal Server Error",
//             error : err
//         })
//     }
// };

const sendsmspostrequestcontroller = async(req, res)=>{
    try{
        const {numbers} = req.body;
        OTP = otpGenerator.generate(6, { upperCaseAlphabets: false, specialChars: false });
        const options= {
            message: `Your OTP is ${OTP}`,
            language : "english",
            route: 'q',
            numbers: numbers,
            flash:1
        };
        try{
            const response = await fetch('https://www.fast2sms.com/dev/bulkV2', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': AUTHORISATION_CODE
                },
                body: JSON.stringify(options),
            })
            const result = await response.json();
            console.log(result);
            if(result.return === true){
            return res.status(200).send({
                    success : true,
                    message : `OTP sent to the provided numbers`
                })
            }
        }catch(err){
            console.log("Error:", err);
            res.status(500).send({
                success : false,
                message : "Failed to send the OTP",
                error : err
            });
        }
    }catch(err){
        res.status(500).send({
            success : false,
            message : "Internal Server Error",
            error : err
        })
    }
}

const sendotppostrequestcontroller = async(req, res)=>{
    try{
        const {numbers} = req.body;
        OTP = otpGenerator.generate(6, { upperCaseAlphabets: false, specialChars: false });
        // return res.status(200).send({
        //     success : true, 
        //     message: `OTP sent to the provided numbers. OTP is ${OTP}`,
        //     otp : OTP
        // })
        const options= {
            variable_values : OTP,
            route: 'otp',
            numbers: numbers,
            flash:1
        };
        try{
            const response = await fetch('https://www.fast2sms.com/dev/bulkV2', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': AUTHORISATION_CODE
                },
                body: JSON.stringify(options),
            })
            const result = await response.json();
            console.log(result);
            if(result.return === true){
            return res.status(200).send({
                    success : true,
                    message : `OTP sent to the provided numbers`
                })
            }
        }catch(err){
            console.log("Error:", err);
            res.status(500).send({
                success : false,
                message : "Failed to send the OTP",
                error : err
            });
        }
    }catch(err){
        res.status(500).send({
            success : false,
            message : "Internal Server Error",
            error : err
        })
    }
}

const verifyotpcontroller = async(req, res)=>{
    try {
        let {otp} = req.body;
        if(OTP != otp){
            try{
                return res.status(400).send({
                    success : false,
                    message : "Incorrect OTP"
                });
            }catch(err){
                res.status(400).send({
                    success : false,
                    message : "Unable to verify OTP",
                    error : err
                })
            }
        }
        res.status(200).send({
            success : true,
            message : "OTP verified successfully"
        });
    } catch (error) {
        return res.status(500).send({
            success : false,
            message : "Internal Server Error",
            error : error
        });
    }
    
};

module.exports = {sendsmspostrequestcontroller, sendotppostrequestcontroller, verifyotpcontroller};