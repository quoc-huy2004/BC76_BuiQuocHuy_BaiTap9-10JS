function checkEmptyValue(theThongBao, value) {
  if (value == "") {
    theThongBao.innerHTML = "Vui lòng không bỏ trống";
    return false;
  } else {
    theThongBao.innerHTML = "";
    return true;
  }
}

function checkMinMaxValue(theThongBao, value, min, max) {
  let doDai = value.length;
  if (doDai < min || doDai > max) {
    theThongBao.innerHTML = `Vui lòng nhập trong khoảng từ ${min} đến ${max}`;
    return false;
  } else {
    theThongBao.innerHTML = "";
    return true;
  }
}

function checkEmailValue(theThongBao, value) {
  let regexEmail =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  let checkEmail = regexEmail.test(value);
  if (checkEmail) {
    theThongBao.innerHTML = "";
    return true;
  } else {
    theThongBao.innerHTML = "Vui lòng nhập đúng định dạng Email";
    return false;
  }
}

function checkPasswordValue(theThongBao, value) {
  let regexPassword =
    /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+{}\[\]:;"'<>?,.\/\\|`~]).{8,}$/;
  let checkPassword = regexPassword.test(value);
  if (checkPassword) {
    theThongBao.innerHTML = "";
    return true;
  } else {
    theThongBao.innerHTML =
      "Vui lòng nhập mk có ít nhất 1 ký tự viết hoa, 1 ký tự số và 1 ký tự đặc biệt";
    return false;
  }
}

function checkNameValue(theThongBao, value) {
  let regexName = /^[a-zA-Z\s]+$/;
  let checkName = regexName.test(value);
  if (checkName) {
    theThongBao.innerHTML = "";
    return true;
  } else {
    theThongBao.innerHTML = "Tên nhân viên chỉ bao gồm chữ";
    return false;
  }
}

function checkWorkingDate(theThongBao, value) {
  let regexDate = /^(0[1-9]|1[0-2])\/(0[1-9]|[12][0-9]|3[01])\/\d{4}$/;
  let checkDate = regexDate.test(value);
  if (checkDate) {
    theThongBao.innerHTML = "";
    return true;
  } else {
    theThongBao.innerHTML = "Vui lòng nhập đúng định dạng mm/dd/yyyy";
    return false;
  }
}

function checkSalaryValue(theThongBao, value) {
  let regexNum = /^\d+$/;
  let checkNum = regexNum.test(value);
  if (checkNum) {
    let salaryValue = parseInt(value, 10);
    if (salaryValue >= 1000000 && salaryValue <= 20000000) {
      theThongBao.innerHTML = "";
      return true;
    } else {
      theThongBao.innerHTML = "Lương cơ bản phải từ 1-20 triệu";
      return false;
    }
  } else {
    theThongBao.innerHTML = "Lương cơ bản phải là số";
    return false;
  }
}

function checkHoursValue(theThongBao, value) {
  let regexHours = /^\d+$/;
  let checkHours = regexHours.test(value);
  if (checkHours) {
    let hoursValue = parseInt(value, 10);
    if (hoursValue >= 80 && hoursValue <= 200) {
      theThongBao.innerHTML = "";
      return true;
    } else {
      theThongBao.innerHTML = "Vui lòng nhập giờ làm từ 80 đến 200 giờ";
      return false;
    }
  } else {
    theThongBao.innerHTML = "Giờ làm phải là số";
  }
}
