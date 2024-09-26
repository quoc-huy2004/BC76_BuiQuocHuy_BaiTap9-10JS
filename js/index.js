let arrNhanVien = [];
// ---------- Thêm nhân viên ----------
document.getElementById("formQLNV").onsubmit = function (event) {
  event.preventDefault();
  let nhanVien = getValueForm();
  if (nhanVien) {
    arrNhanVien.push(nhanVien);
    setLocalStorage("arrNhanVien", arrNhanVien);
    renderDataNhanVien();
    event.target.reset();
  }
};

// ---------- Chức năng hiển thị thông tin nhân viên lên table ----------
function renderDataNhanVien(arr = arrNhanVien) {
  let content = "";
  for (let nhanVien of arr) {
    let newNhanVien = new NhanVien();
    Object.assign(newNhanVien, nhanVien);
    let { tknv, name, email, datepicker, chucvu, xepLoai } = newNhanVien;
    content += `
        <tr>
            <td>${tknv}</td>
            <td>${name}</td>
            <td>${email}</td>
            <td>${datepicker}</td>
            <td>${chucvu}</td>
            <td>${newNhanVien.tongLuong()}</td>
            <td>${newNhanVien.xepLoaiNhanVien()}</td>
            <td>
                <button onclick = "deleteNhanVien('${tknv}')" class ="btn btn-danger">Xóa</button>
                <button onclick = "getInfoNhanVien('${tknv}')" class ="btn btn-warning">Sửa</button>
            </td>
        </tr>
        `;
  }
  document.getElementById("tableDanhSach").innerHTML = content;
}

window.onload = function () {
  let dataLocal = getLocalStorage("arrNhanVien");
  if (dataLocal) {
    arrNhanVien = dataLocal;
    renderDataNhanVien();
  }
};

// --------- Local Storage ---------
function setLocalStorage(key, value) {
  let dataString = JSON.stringify(value);
  localStorage.setItem(key, dataString);
}

function getLocalStorage(key) {
  let dataLocal = localStorage.getItem(key);
  return dataLocal ? JSON.parse(dataLocal) : null;
}

// ------------- Xóa nhân viên --------------
function deleteNhanVien(taikhoanNV) {
  let index = arrNhanVien.findIndex((item, i) => item.tknv == taikhoanNV);
  if (index != -1) {
    arrNhanVien.splice(index, 1);
    renderDataNhanVien();
    setLocalStorage("arrNhanVien", arrNhanVien);
  }
}

// --------------- Get info nhân viên -----------------
function getInfoNhanVien(taikhoanNV) {
  let nhanVien = arrNhanVien.find((item, index) => item.tknv == taikhoanNV);
  if (nhanVien) {
    let arrField = document.querySelectorAll("form input, form select");
    for (let field of arrField) {
      field.value = nhanVien[field.id];
      if (field.id == "tknv") {
        field.readOnly = true;
      }
    }
  }
}

// ---------------- Cập nhật nhân viên ----------------
document.getElementById("btnCapNhat").onclick = function () {
  let nhanVien = getValueForm();
  if (nhanVien) {
    let index = arrNhanVien.findIndex((item, i) => item.tknv == nhanVien.tknv);
    if (index != -1) {
      arrNhanVien[index] = nhanVien;
      renderDataNhanVien();
      setLocalStorage("arrNhanVien", arrNhanVien);
      document.getElementById("tknv").readOnly = false;
      document.getElementById("formQLNV").reset();
    }
  }
};

// ------------------ Get value Form ----------------
function getValueForm() {
  let arrField = document.querySelectorAll("#formQLNV input, #formQLNV select");
  let nhanVien = new NhanVien();

  let flag = true;
  for (let field of arrField) {
    let { value, id } = field;
    nhanVien[id] = value;

    let theThongBao = field.parentElement.querySelector("span");

    if (!checkEmptyValue(theThongBao, value)) {
      flag = false;
    } else {
      let dataValue = field.getAttribute("data-validation");
      let dataMin = field.getAttribute("data-min");
      let dataMax = field.getAttribute("data-max");
      if (dataValue == "email" && !checkEmailValue(theThongBao, value)) {
        flag = false;
      } else if (
        dataValue == "pass" &&
        (!checkPasswordValue(theThongBao, value) ||
          !checkMinMaxValue(theThongBao, value, 6, 10))
      ) {
        flag = false;
      } else if (
        dataValue == "minMax" &&
        !checkMinMaxValue(theThongBao, value, +dataMin, +dataMax)
      ) {
        flag = false;
      } else if (
        dataValue == "employeeName" &&
        !checkNameValue(theThongBao, value)
      ) {
        flag = false;
      } else if (dataValue == "date" && !checkWorkingDate(theThongBao, value)) {
        flag = false;
      } else if (
        dataValue == "salaryCB" &&
        !checkSalaryValue(theThongBao, value)
      ) {
        flag = false;
      } else if (dataValue == "hours" && !checkHoursValue(theThongBao, value)) {
        flag = false;
      }
    }
  }
  return flag ? nhanVien : null;
}

// ---------------- Tìm kiếm nhân viên theo xếp loại ---------------
document.getElementById("searchName").oninput = function (event) {
  let keyWord = event.target.value.trim().toLowerCase();
  let newKeyWord = removeVietnameseTones(keyWord);
  let arrSearch = arrNhanVien.filter((item, index) => {
    let nhanVien = new NhanVien();
    let newTenNV = removeVietnameseTones(
      nhanVien.xepLoaiNhanVien().trim().toLowerCase()
    );
    return newTenNV.includes(newKeyWord);
  });
  renderDataNhanVien(arrSearch);
};
