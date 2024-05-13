import styled from '@emotion/styled';

interface IFormInputProps {
  error?: boolean;
}

export const FormEl = styled.form`
  width: 400px;
  margin: 0 auto;
`;

export const FormLabel = styled.label`
  display: block;
  font-size: 15px;
  font-weight: 700;
  line-height: 1.46667;
  margin: 0;
  cursor: pointer;
  padding-bottom: 8px;
`;

export const FormInputWrap = styled.div`
  margin: 0 0 20px;

  .error {
    display: flex;
    color: #c01343;
    align-items: center;
    font-weight: 400;
    margin: 8px 0 4px;

    > svg {
      display: block;
      margin-right: 4px;
      font-size: var(--s, inherit);
      print-color-adjust: exact;
      flex-shrink: 0;
      width: 1em;
      height: 1em;
      color: #c01343;
    }
  }
`;
export const FormInput = styled.input<IFormInputProps>`
  width: 100%;
  height: 44px;
  padding: 11px 12px 13px;
  font-size: 18px;
  line-height: 1.33333;
  border: 1px solid
    ${(props) => (props.error ? 'rgba( 224,30,90 ,1)' : 'rgba( 29,28,29 ,.3)')};
`;

export const FormSubmitBtn = styled.button`
  background-color: #611f69e6;
  border: none;
  text-decoration: none;
  width: 100%;
  min-width: 96px;
  height: 44px;
  padding: 0 16px 3px;
  font-size: 18px;
  font-weight: 700;
  color: #fff;
`;

export const FormError = styled.span`
  color: #c01343;
  font-weight: 400;
`;
