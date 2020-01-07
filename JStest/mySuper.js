function Parent(familyName) {
  this.familyName = familyName;
}
Parent.prototype.getFamilyName = function() {
  return this.familyName;
};
function Child(personName, familyName) {
  Parent.call(this, familyName);
  this.personName = personName;
}
Child.prototype = Object.create(Parent.prototype, {
  constructor: {
    value: Child,
    enumerable: false,
    writable: true,
    configurable: true
  }
});
Child.prototype.getFullName=function(){
    return `${this.familyName} ${this.personName}`
}
var zhangsan = new Child("三", "zhang");
console.log(object);
