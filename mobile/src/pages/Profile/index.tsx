import React, { useCallback, useRef } from 'react';
import * as Yup from 'yup';
import {
  KeyboardAvoidingView,
  Platform,
  View,
  ScrollView,
  TextInput,
  Alert,

} from 'react-native';

import Input from '../../components/Input';
import Button from '../../components/Button';
import getValidationErrors from '../../utils/getValidationErrors';
import Icon from 'react-native-vector-icons/Feather';
import api from '../../services/api';
import ImagePicker from 'react-native-image-picker';

import { Container, Title, BackButton, UserAvatarButton,UserAvatar } from './styles';
import { useNavigation } from '@react-navigation/native';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/mobile';
import { useAuth } from '../../hooks/Auth';


interface ProfileFormData {
  name: string;
  email: string;
  password: string;
  old_password: string,
  password_confirmation: string,
}

const SignUp: React.FC = () => {
  const navigation = useNavigation();
  const formRef = useRef<FormHandles>(null);
  const emailInputref = useRef<TextInput>(null);

  const oldPasswordInputRef = useRef<TextInput>(null);
  const passwordInputRef = useRef<TextInput>(null);
  const comfirmPasswordInputRef = useRef<TextInput>(null);

  const { user, updateUser, signOut } = useAuth();

  const handleSignUp = useCallback(
    async (data: ProfileFormData) => {
      try {
        formRef.current?.setErrors({});

        const schema = Yup.object().shape({
          name: Yup.string().required('Nome obrigatório'),
          email: Yup.string()
            .required('E-mail obrigatório')
            .email('Digite um e-mail válido'),
          old_password: Yup.string(),
          password: Yup.string().when('old_password', {
            is: val => !!val.length,
            then: Yup.string().required('Campo obrigatório'),
            otherwise: Yup.string(),
          }),
          password_confirmation: Yup.string()
            .when('old_password', {
              is: val => !!val.length,
              then: Yup.string().required('Campo obrigatório'),
              otherwise: Yup.string(),
            })
            .oneOf([Yup.ref('password'), undefined], 'Confirmação incorreta'),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        const {
          name,
          email,
          password,
          old_password,
          password_confirmation,
        } = data;

        const formData = {
          name,
          email,
          ...(old_password
            ? {
                old_password,
                password,
                password_confirmation,
              }
            : {}),
        };

        await schema.validate(data, {
          abortEarly: false,
        });

        const response = await api.put('profile', formData);

        updateUser(response.data);

        Alert.alert(
          'Cadastro atualizado com sucesso!',
        );

        navigation.goBack();
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err);
          formRef.current?.setErrors(errors);
        }

        Alert.alert(
          'Erro na atualizão do perfil',
          'Ocorreu um erro ao atualizar seu prfil, tente novamente',
        );
      }
    },
    [navigation, updateUser],
  );

  const handleUpdateAvatar = useCallback(() => {
    ImagePicker.showImagePicker({
      title: 'Selecione um avatar',
      cancelButtonTitle: 'Cancelar',
      takePhotoButtonTitle: 'Usar cãmera',
      chooseFromLibraryButtonTitle: 'Escolher da galeria',
    }, response => {
      if (response.didCancel) {
       return;
      }

      if (response.error) {
        Alert.alert('Erro ao atualizar seu avatar');
        return;
      }

        const data = new FormData();

        data.append('avatar', {
          type: 'image/jpeg',
          name: `${user.id}.jpg`,
          uri: response.uri,
        });

        api.patch('users/avatar', data).then(apiResponse =>
          console.log(apiResponse.data)
        );
    })
  },[updateUser, user.id]);

  const handleGoBack = useCallback(() => {
    navigation.goBack();
  },[navigation]);
  return (
    <>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        enabled
      >
        <ScrollView
          contentContainerStyle={{ flex: 1 }}
          keyboardShouldPersistTaps="handled"
        >
          <Container>
            <BackButton onPress={handleGoBack}>
              <Icon name="chevron-left" size={24} color="#999591"/>
            </BackButton>

            <UserAvatarButton onPress={signOut}>
              <UserAvatar source={{ uri: user.avatar_url }}/>
            </UserAvatarButton>

            <View>
              <Title>Meu Perfil</Title>
            </View>

            <Form initialData={user} ref={formRef} onSubmit={handleSignUp}>
              <Input
                name="name"
                icon="user"
                placeholder="Nome"
                autoCapitalize="words"
                returnKeyType="next"
                onSubmitEditing={() => {
                  emailInputref.current?.focus();
                }}
              />
              <Input
                ref={emailInputref}
                keyboardType="email-address"
                autoCapitalize="none"
                autoCorrect={false}
                name="email"
                icon="mail"
                placeholder="E-mail"
                returnKeyType="next"
                onSubmitEditing={() => {
                  oldPasswordInputRef.current?.focus();
                }}
              />

              <Input
                ref={oldPasswordInputRef}
                secureTextEntry
                name="old_password"
                icon="lock"
                placeholder="Senha atual"
                textContentType="newPassword"
                returnKeyType="next"
                containerStyle={{marginTop: 16}}
                onSubmitEditing={() => {
                  passwordInputRef.current?.focus();
                }}
              />

              <Input
                ref={passwordInputRef}
                secureTextEntry
                name="password"
                icon="lock"
                placeholder="Nova senha"
                textContentType="newPassword"
                returnKeyType="next"
                onSubmitEditing={() => {
                  comfirmPasswordInputRef.current?.focus();
                }}

              />

              <Input
                ref={comfirmPasswordInputRef}
                secureTextEntry
                name="password_confirmation"
                icon="lock"
                placeholder="Confirmar Senha"
                textContentType="newPassword"
                returnKeyType="send"
                onSubmitEditing={() => {
                  formRef.current?.submitForm();
                }}
              />
            </Form>

            <Button
              onPress={() => {
                formRef.current?.submitForm();
              }}
            >
              Confirmar mudanças
            </Button>
          </Container>
        </ScrollView>
      </KeyboardAvoidingView>
    </>
  );
};

export default SignUp;
