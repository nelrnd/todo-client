const FormError = ({ msg }) =>
  msg ? <p className="mt-2 text-sm text-red-500">{msg}</p> : null

export default FormError
