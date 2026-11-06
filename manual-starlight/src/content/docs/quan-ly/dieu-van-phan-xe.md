---
title: Điều vận & phân xe
description: "Trang Điều vận tập hợp toàn bộ đơn hàng cần xếp xe. Con số thông báo trên menu cho biết số lượng đơn đang chờ."
sidebar:
  label: Điều vận & phân xe
---

Trang **Điều vận** tập hợp toàn bộ đơn hàng cần xếp xe. Con số thông báo trên menu cho biết số lượng đơn đang chờ.

[![Trang Điều vận với danh sách Đơn hàng cần điều vận và nút Tạo chuyến mới được đánh số 1, 2](/ttransport/assets/giamdoc-dispatch.webp)](/ttransport/assets/giamdoc-dispatch.webp)

***Trang Điều vận.** Số ①② ứng với các bước thao tác.*

1. Rà soát **Đơn hàng cần điều vận**: xem tuyến, mặt hàng và gán xe/lái xe trực tiếp trên đơn.
2. Nhấn **Tạo chuyến mới** để mở biểu mẫu nhập lệnh vận chuyển mới khi có phát sinh.

#### Hộp thoại "Đổi xe / lái xe" — quy tắc

<dl>
  <dt>Xe nhà</dt><dd>Bắt buộc chọn <strong>đủ xe đầu kéo và lái xe</strong> rồi mới lưu được.</dd>
  <dt>Xe ngoài</dt><dd>Chọn nhà xe; <strong>biển số có thể để trống</strong> — chỉ bắt buộc trước khi hoàn thành chuyến.</dd>
  <dt>Phân xe lại</dt><dd>Chỉ được khi lệnh còn <strong>Mới tạo</strong>. Đã xuất phát thì bị chặn: *"Chỉ có thể đổi lái xe/xe cho chuyến chưa xuất phát."*</dd>
  <dt>Khởi hành loạt</dt><dd>Tích nhiều đơn → bấm <strong>"Khởi hành N đơn"</strong> — hệ thống chạy tuần tự, đơn lỗi báo ngay tại dòng.</dd>
  <dt>Một xe một lệnh</dt><dd>Gán xe đang chạy lệnh khác bị chặn: *"Xe đang chạy chuyến &lt;mã lệnh&gt;. Vui lòng hoàn thành chuyến đó trước."*</dd>
  <dt>Cần lưu ý</dt><dd>Xe rảnh nhưng lái mặc định đang bận chuyến khác lùi vào "Cần lưu ý — chờ tài xế", không tính Sẵn sàng — tránh phân xe xong mới hết người lái.</dd>
</dl>

:::note[Theo dõi hành trình]
chuyến **Đang chạy** hiện trên bản đồ "Vị trí thời gian thực" cập nhật mỗi 10 giây (đang chạy / dừng / mất tín hiệu). Điều vận chỉ đọc vị trí — không can thiệp GPS từ xa.
:::

[![Màn Điều vận với chỉ số đội xe, bảng Trạng thái đội xe, bản đồ Vị trí thời gian thực và bảng Đơn hàng cần điều vận có gán xe lái trực tiếp trên từng dòng](/ttransport/assets/giamdoc-dispatch-assign.webp)](/ttransport/assets/giamdoc-dispatch-assign.webp)

***Màn Điều vận.** Gán xe/lái trực tiếp trên từng đơn chờ: chọn Xe nhà / Xe ngoài → chọn xe đầu kéo → lái xe → Khởi hành; kèm chỉ số đội xe và bản đồ GPS thời gian thực.*
