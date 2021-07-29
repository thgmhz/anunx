import bcrypt from 'bcrypt'

const crypto = async pwd => {
  const salt = await bcrypt.genSalt()

  const password = await bcrypt.hash(pwd, salt)

  return password
}

const compare = (pwd, hash) => {
  const result = bcrypt.compare(pwd, hash)

  return result
}

export {
  crypto,
  compare,
}