import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { mobilePhoneNumberRegEx, passwordRegex } from '../../../utils/regex';

const userCreateSchema = yup.object().shape({
  name: yup.string().required(),
  email: yup.string().email().required(),
  mobilePhoneNumber: yup.string().matches(mobilePhoneNumberRegEx),
  password: yup
    .string()
    .matches(
      passwordRegex,
      'Password must contain a minimum of 8 characters, one uppercase, one lowercase, one number and one special case character'
    ),
  confirmPassword: yup.string().oneOf([yup.ref('password'), null]),
});

const useUserCreate = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(userCreateSchema),
  });

  return {
    register,
    handleSubmit,
    errors,
  };
};

export default useUserCreate;
