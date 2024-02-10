import styled from '@emotion/styled';
import { useFormContext } from 'react-hook-form';
import type { RegisterForm } from 'types/register';
import { FormInput } from 'components/form';
import { ERROR_MESSAGE, VALID_VALUE } from 'constants/validation';

export const FindPasswordForm = () => {
  /**
   * @todo
   * RegisterForm 대신 PasswordFindForm 정의하여 사용
   */
  const { register } = useFormContext<RegisterForm>();

  return (
    <Form>
      <FormInput
        register={register('email', {
          required: ERROR_MESSAGE.email.required,
          pattern: {
            value: VALID_VALUE.email,
            message: ERROR_MESSAGE.email.pattern,
          },
        })}
        type="text"
        placeholder="이메일"
        label="이메일"
      />
    </Form>
  );
};

const Form = styled.form`
  margin-top: 40px;
`;
