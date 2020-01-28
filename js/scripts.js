var x = 1
// Business Logic for AddressBook ---------
function AddressBook() {
  this.contacts = [],
  this.currentId = 0
}

AddressBook.prototype.addContact = function(contact) {
  contact.id = this.assignId();
  this.contacts.push(contact);
}

AddressBook.prototype.assignId = function() {
  this.currentId += 1;
  return this.currentId;
}

AddressBook.prototype.findContact = function(id) {
  for (var i=0; i< this.contacts.length; i++) {
    if (this.contacts[i]) {
      if (this.contacts[i].id == id) {
        return this.contacts[i];
      }
    }
  };
  return false;
}

AddressBook.prototype.deleteContact = function(id) {
  for (var i=0; i< this.contacts.length; i++) {
    if (this.contacts[i]) {
      if (this.contacts[i].id == id) {
        delete this.contacts[i];
        return true;
      }
    }
  };
  return false;
}

// Business Logic for Contacts ---------
function Contact(firstName, lastName, phoneNumber, email, address, additionalEmail) {
  this.firstName = firstName,
  this.lastName = lastName,
  this.phoneNumber = phoneNumber,
  this.email = email,
  this.address = address,
  this.additionalEmail = additionalEmail
  
  

}

Contact.prototype.fullName = function() {
  return this.firstName + " " + this.lastName;
}

// User Interface Logic ---------
var addressBook = new AddressBook();

$("#personal-contacts-btn").click(function(){
  x=1
})
$("#work-contacts-btn").click(function(){
  x=2
})
$("#school-contacts-btn").click(function(){
  x=3
})

function displayContactDetails(addressBookToDisplay) {
  var contactsList = $("ul#contacts" + x);
  console.log(contactsList)
  var htmlForContactInfo = "";
  addressBookToDisplay.contacts.forEach(function(contact) {
    htmlForContactInfo += "<li id=" + contact.id + ">" + contact.firstName + " " + contact.lastName + "</li>";
  });
  contactsList.html(htmlForContactInfo);
};

function showContact(contactId) {
  var contact = addressBook.findContact(contactId);
  $("#show-contact" + x).show();
  $("#additional-email" + x).hide();
  if (contact.additionalEmail !== ''){
    $("#additional-email" + x).show()
    $(".email-additional-address" + x).html(contact.additionalEmail);
    console.log("was not blank");
  }
  $(".first-name" + x).html(contact.firstName);
  $(".last-name" + x).html(contact.lastName);
  $(".phone-number" + x).html(contact.phoneNumber);
  $(".email-address" + x).html(contact.email);
  $(".p-address" + x).html(contact.address);
  var buttons = $("#buttons" + x);
  buttons.empty();
  buttons.append("<button class='deleteButton' id=" +  + contact.id + ">Delete</button>");
}
function attachContactListeners() {
  $("ul#contacts" + x).on("click", "li", function() {
    console.log("clicked");
    
    showContact(this.id);
    
    
  });
  $("#buttons" + x).on("click", ".deleteButton", function() {
    addressBook.deleteContact(this.id);
    $("#show-contact" + x).hide();
    displayContactDetails(addressBook);
  });
};

$(document).ready(function() {
  attachContactListeners();
  $("#new-contact").submit(function(event) {
    event.preventDefault();
    console.log("test");
    
    

    var inputtedFirstName = $("input#new-first-name").val();
    var inputtedLastName = $("input#new-last-name").val();
    var inputtedPhoneNumber = $("input#new-phone-number").val();
    var inputtedEmail = $("input#new-email-address").val();
    var inputtedAdditionalEmail = $("input#new-additional-email-address").val();
    var inputtedAddress = $("input#p-address").val();
    console.log(x);
    
    $("input#new-first-name").val("");
    $("input#new-last-name").val("");
    $("input#new-phone-number").val("");
    $("input#new-email-address").val("");
    $("input#new-additional-email-address").val("");
    $("input#p-address").val("");
    var newContact = new Contact(inputtedFirstName, inputtedLastName, inputtedPhoneNumber, inputtedEmail, inputtedAddress, inputtedAdditionalEmail);
    console.log(newContact)
    addressBook.addContact(newContact);
    displayContactDetails(addressBook);
  })
})
