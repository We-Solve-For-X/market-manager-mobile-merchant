import { Alert } from 'react-native'

export function sendMessageError() {
    return Alert.alert(
      'Send Error',
      'Unabe to send your message at this moment. Please check your network connection, or contact support if the problem persists.',
      [
        {text: 'OK'},
      ],
      { cancelable: true }
    )
  }

  export function incompleteFields() {
    return Alert.alert(
      'Content Required',
      'Please complete all required fields before sumbiting.',
      [
        {text: 'OK'},
      ],
      { cancelable: true }
    )
  }

  export function systemAlert(topic = '', message = '') {
    return Alert.alert(
      topic,
      message,
      [
        {text: 'OK'},
      ],
      { cancelable: true }
    )
  }