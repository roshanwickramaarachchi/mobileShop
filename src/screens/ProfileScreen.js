import React, {useContext} from 'react';
import {StyleSheet, Text, Button} from 'react-native';
import {Context as AuthContext} from '../context/AuthContext';
import Spacer from '../components/Spacer';

const AccountScreen = () => {
  const {signout} = useContext(AuthContext);

  return (
    <>
      <Text style={{fontSize: 48}}>AccountScreen</Text>
      <Spacer>
        <Button title="Sign Out" onPress={signout} />
      </Spacer>
    </>
  );
};

const styles = StyleSheet.create({});

export default AccountScreen;
