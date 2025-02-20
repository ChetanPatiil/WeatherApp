import { StyleSheet, Text, View ,TextInput,Button, Alert} from 'react-native'
import React,{useState} from 'react'
import Mailer from 'react-native-mail';

const sendEmail = (subject,email,body) => {
  if (!Mailer) {
    console.log(Mailer);
    console.error("Mailer is not initialized.");
    return false;
  }
  Mailer.mail({
    subject: subject,
    recipients: email,
    body: body,
    isHTML: false,
  }, (error, event) => {
    if (error) {
      console.log('Error sending email', error);
      return false;
    } else {
      console.log('Email sent', event);
      return true;
    }
  });
};


export default function ContactPage() {
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [body, setBody] = useState('');
  const[error,setError] =useState('')

  const handleSendEmail=()=>{
    if(!email && !subject && !body)
    {
      Alert.alert('Please Fill All Feilds')
    }
    else{
      if(sendEmail(subject,email,body))
        {
         Alert.alert("Email send succesfully")
        }
        else{
         Alert.alert("Failed to send email",'Please Try Again')
        }
    }
    
  }

  return (
    <View style={{ padding: 20 }}>
      <TextInput
        placeholder="Recipient's Email"
        value={email}
        onChangeText={setEmail}
        style={{ marginBottom: 10, padding: 8, borderColor: '#ccc', borderWidth: 1 }}
      />
      <TextInput
        placeholder="Subject"
        value={subject}
        onChangeText={setSubject}
        style={{ marginBottom: 10, padding: 8, borderColor: '#ccc', borderWidth: 1 }}
      />
      <TextInput
        placeholder="Body"
        value={body}
        onChangeText={setBody}
        style={{ marginBottom: 20, padding: 8, borderColor: '#ccc', borderWidth: 1 }}
      />
      <Button title="Send Email" onPress={handleSendEmail} />
    </View>
  )
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        justifyContent:'center',
        alignItems:'center',
    },
    headlabel:{
       fontSize:20,
       fontWeight:'bold',
       color:'green',
       }
})