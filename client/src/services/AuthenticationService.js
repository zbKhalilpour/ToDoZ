import Api from './Api'

export default {
  register (credential) {
    return Api().post('api/auth/register', credential)
  }
}
