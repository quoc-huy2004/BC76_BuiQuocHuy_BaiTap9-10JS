class NhanVien {
  tknv = "";
  name = "";
  email = "";
  password = "";
  datepicker = "";
  luongCB = "";
  chucvu = "";
  gioLam = "";
  xepLoai = "";

  tongLuong = function () {
    let heSo = 1;
    if (this.chucvu === "Sếp") {
      heSo = 3;
    } else if (this.chucvu === "Trưởng phòng") {
      heSo = 2;
    }
    // Chuyển luongCB về dạng số để tính toán
    let luongCB = Number(this.luongCB);
    return luongCB * heSo;
  };

  xepLoaiNhanVien = function () {
    // Chuyển giờ làm của nhân viên thành dạng số để xếp loại
    let gioLam = Number(this.gioLam);
    if (gioLam >= 192) {
      this.xepLoai = "Nhân viên xuất sắc";
    } else if (gioLam >= 176) {
      this.xepLoai = "Nhân viên giỏi";
    } else if (gioLam >= 160) {
      this.xepLoai = "Nhân viên khá";
    } else {
      this.xepLoai = "Nhân viên trung bình";
    }
    return this.xepLoai;
  };
}
