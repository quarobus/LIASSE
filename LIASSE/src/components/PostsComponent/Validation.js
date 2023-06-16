export default function Validation(values){
  
    const errors = {}


    if(values.title === ""){
        errors.title = "Title is Required"
    }
    if(values.authors === ""){
        errors.authors = "Authors is Required"
    }
    if (values.abstract === "") {
        errors.abstract = "Description is Required";
      } else if (values.abstract.length < 100) {
        errors.abstract = "Description must be at least 100 characters long";
      }

    if(values.publisher === ""){
        errors.publisher = "Publisher is Required"
    }
    if(values.citations === ""){
        errors.citations = "Number of Citations is Required"
    }else if (isNaN(values.citations)) {
        errors.citations = "Number of Citations must be a number";
      }
    if (values.link === "") {
        errors.link = "Link is Required";
      } else {
        const urlPattern = /^(?:(?:https?|ftp):\/\/)?(?:www\.)?([^\s.]+\.\S{2}|localhost[:?\d]*)\S*$/;
        if (!urlPattern.test(values.link)) {
          errors.link = "Invalid Link. Please enter a valid URL";
        }
      }
    if (values.publication_date === "") {
        errors.publication_date = "Date is Required";
      } else {
        const selectedDate = new Date(values.publication_date);
        const currentDate = new Date();
    
        if (selectedDate > currentDate) {
          errors.publication_date = "Date is not valid";
        }
      }
    if(values.journal === ""){
        errors.journal = "Journal is Required"
    }
    if(values.conference === ""){
        errors.conference = "Conference is Required"
    }
    if(values.institution === ""){
        errors.institution = "Institution is Required"
    }
    if(values.book === ""){
        errors.book = "Book is Required"
    }
    if(values.isbn === ""){
        errors.isbn = "Isbn is Required"
    }
    if(values.volume === ""){
        errors.volume = "Volume is Required"
    }else if (isNaN(values.volume)) {
        errors.volume = "Volume must be a number";
      }
    if(values.pages === ""){
        errors.pages = "Pages is Required"
    }else if (isNaN(values.pages)) {
        errors.pages = "Pages must be a number";
      }

    return errors;
}