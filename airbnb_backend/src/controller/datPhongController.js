import { DatPhongViewModel } from "../models/datPhongViewModel.js";
import { PhongViewModel } from "../models/phongViewModel.js";
import { ThongTinNguoiDung } from "../models/thongTinNguoiDung.js";

// Lấy tất cả thông tin đặt phòng
export const getAllBookings = async (req, res) => {
  try {
    const bookings = await DatPhongViewModel.findAll({
      include: [
        { model: PhongViewModel, attributes: ["tenPhong", "giaTien"] },
        { model: ThongTinNguoiDung, attributes: ["name", "email"] },
      ],
    });
    res.status(200).json(bookings);
  } catch (error) {
    console.error("Lỗi khi lấy danh sách đặt phòng:", error);
    res.status(500).json({ message: "Lỗi máy chủ", error: error.message });
  }
};

// Tạo một đặt phòng mới
export const createBooking = async (req, res) => {
  try {
    const { maPhong, ngayDen, ngayDi, soLuongKhach, maNguoiDung } = req.body;

    // Kiểm tra mã phòng và mã người dùng có tồn tại
    const room = await PhongViewModel.findByPk(maPhong);
    const user = await ThongTinNguoiDung.findByPk(maNguoiDung);
    if (!room) {
      return res.status(400).json({ message: "Phòng không tồn tại" });
    }
    if (!user) {
      return res.status(400).json({ message: "Người dùng không tồn tại" });
    }

    const newBooking = await DatPhongViewModel.create({
      maPhong,
      ngayDen,
      ngayDi,
      soLuongKhach,
      maNguoiDung,
    });

    res.status(201).json({
      message: "Tạo đặt phòng thành công",
      newBooking,
    });
  } catch (error) {
    console.error("Lỗi khi tạo đặt phòng:", error);
    res.status(500).json({ message: "Lỗi máy chủ", error: error.message });
  }
};

// Lấy thông tin đặt phòng theo ID
export const getBookingById = async (req, res) => {
  try {
    const { id } = req.params;

    const booking = await DatPhongViewModel.findByPk(id, {
      include: [
        { model: PhongViewModel, attributes: ["tenPhong", "giaTien"] },
        { model: ThongTinNguoiDung, attributes: ["name", "email"] },
      ],
    });

    if (!booking) {
      return res.status(404).json({ message: "Đặt phòng không tồn tại" });
    }

    res.status(200).json(booking);
  } catch (error) {
    console.error("Lỗi khi lấy thông tin đặt phòng:", error);
    res.status(500).json({ message: "Lỗi máy chủ", error: error.message });
  }
};

// Cập nhật thông tin đặt phòng
export const updateBooking = async (req, res) => {
  try {
    const { id } = req.params;
    const { maPhong, ngayDen, ngayDi, soLuongKhach, maNguoiDung } = req.body;

    const booking = await DatPhongViewModel.findByPk(id);
    if (!booking) {
      return res.status(404).json({ message: "Đặt phòng không tồn tại" });
    }

    const room = await PhongViewModel.findByPk(maPhong);
    const user = await ThongTinNguoiDung.findByPk(maNguoiDung);
    if (!room) {
      return res.status(400).json({ message: "Phòng không tồn tại" });
    }
    if (!user) {
      return res.status(400).json({ message: "Người dùng không tồn tại" });
    }

    // Cập nhật đặt phòng
    await booking.update({
      maPhong,
      ngayDen,
      ngayDi,
      soLuongKhach,
      maNguoiDung,
    });

    res.status(200).json({
      message: "Cập nhật đặt phòng thành công",
      booking,
    });
  } catch (error) {
    console.error("Lỗi khi cập nhật đặt phòng:", error);
    res.status(500).json({ message: "Lỗi máy chủ", error: error.message });
  }
};

// Xóa đặt phòng
export const deleteBooking = async (req, res) => {
  try {
    const { id } = req.params;

    const booking = await DatPhongViewModel.findByPk(id);
    if (!booking) {
      return res.status(404).json({ message: "Đặt phòng không tồn tại" });
    }

    await booking.destroy();

    res.status(200).json({ message: "Xóa đặt phòng thành công" });
  } catch (error) {
    console.error("Lỗi khi xóa đặt phòng:", error);
    res.status(500).json({ message: "Lỗi máy chủ", error: error.message });
  }
};

// Lấy danh sách đặt phòng theo người dùng
export const getBookingsByUser = async (req, res) => {
  try {
    const { MaNguoiDung } = req.params;

    const bookings = await DatPhongViewModel.findAll({
      where: { maNguoiDung: MaNguoiDung },
      include: [
        { model: PhongViewModel, attributes: ["tenPhong", "giaTien"] },
        { model: ThongTinNguoiDung, attributes: ["name", "email"] },
      ],
    });

    if (!bookings.length) {
      return res
        .status(404)
        .json({ message: "Người dùng chưa có đặt phòng nào" });
    }

    res.status(200).json(bookings);
  } catch (error) {
    console.error("Lỗi khi lấy danh sách đặt phòng theo người dùng:", error);
    res.status(500).json({ message: "Lỗi máy chủ", error: error.message });
  }
};
