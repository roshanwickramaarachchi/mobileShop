import React, {useState} from 'react';
import {View, Text, StyleSheet, TextInput, Button} from 'react-native';
import Spacer from '../components/Spacer';

const ShopForm = ({onSubmit, initialValues}) => {
  const [image, setImage] = useState(initialValues.image);
  const [name, setName] = useState(initialValues.name);
  const [description, setDescription] = useState(initialValues.description);
  const [town, setTown] = useState(initialValues.town);
  const [address, setAddress] = useState(initialValues.address);
  const [phone, setPhone] = useState(initialValues.phone);
  const [email, setEmail] = useState(initialValues.email);
  const [website, setWebsite] = useState(initialValues.website);

  return (
    <View>
      <TextInput style={styles.input} value={image} onChangeText={setImage} />
      <Text style={styles.label}>Enter Name:</Text>
      <TextInput style={styles.input} value={name} onChangeText={setName} />
      <Text style={styles.label}>Enter Description:</Text>
      <TextInput
        style={styles.input}
        value={description}
        onChangeText={setDescription}
      />
      <Text style={styles.label}>Enter Town:</Text>
      <TextInput style={styles.input} value={town} onChangeText={setTown} />
      <Text style={styles.label}>Enter Address:</Text>
      <TextInput
        style={styles.input}
        value={address}
        onChangeText={setAddress}
      />
      <Text style={styles.label}>Enter Phone No:</Text>
      <TextInput style={styles.input} value={phone} onChangeText={setPhone} />
      <Text style={styles.label}>Enter Email:</Text>
      <TextInput style={styles.input} value={email} onChangeText={setEmail} />
      <Text style={styles.label}>Enter Website:</Text>
      <TextInput
        style={styles.input}
        value={website}
        onChangeText={setWebsite}
      />
      <Spacer>
        <Button title="save shop" onPress={() => onSubmit(image, name)} />
      </Spacer>
    </View>
  );
};

ShopForm.defaultProps = {
  initialValues: {image: '', name: ''},
};

const styles = StyleSheet.create({
  input: {
    fontSize: 18,
    borderWidth: 1,
    borderColor: 'black',
    marginBottom: 15,
    padding: 5,
    margin: 5,
  },
  label: {
    fontSize: 20,
    marginBottom: 10,
    marginLeft: 5,
  },
});

export default ShopForm;
