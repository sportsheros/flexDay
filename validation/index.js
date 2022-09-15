const ValidationRule = require('@service/validation/index')

module.exports = {

  AddValidation() {
    return [
      ValidationRule.isEmail('email'),
      ValidationRule.isStringOptionalNotEmpty('address'),
      ValidationRule.required('dob'),
      ValidationRule.isStringOptionalNotEmpty('name')
    ]
  }, 
  UpdateValidation(){
    return [
      ValidationRule.requiredArrayWithLength('tasks',1),
    ]
  }
}