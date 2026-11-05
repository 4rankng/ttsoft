---
title: Cấu hình hệ thống
description: Thiết lập thông tin doanh nghiệp, định mức tiêu hao nhiên liệu, đơn giá cự ly và phụ cấp đi đường.
sidebar:
  label: Cấu hình hệ thống
---

Thiết lập thông tin doanh nghiệp, định mức tiêu hao nhiên liệu, đơn giá cự ly và phụ cấp đi đường.

[![Trang Cấu hình hệ thống với thẻ Thông tin công ty được khoanh đỏ đánh số 1](/ttransport/assets/giamdoc-config.webp)](/ttransport/assets/giamdoc-config.webp)

***Cấu hình hệ thống.** Bấm vào thẻ để cập nhật thông số tương ứng (①).*

:::note[Thận trọng]
Thay đổi định mức nhiên liệu hoặc đơn giá sẽ áp dụng cho toàn bộ chuyến tạo mới sau thời điểm điều chỉnh.
:::

#### Nguyên tắc cấu hình

<dl>
  <dt>Chỉ ảnh hưởng lệnh sau</dt><dd>Sửa danh mục/config chỉ áp dụng cho <strong>lệnh tạo sau</strong> — lệnh đã tạo giữ nguyên bộ số chụp lúc tạo; cần sửa lệnh cũ thì dùng Điều chỉnh sau khóa.</dd>
  <dt>Ngưng dùng thay vì xóa</dt><dd>Xe, cảng, nhà cung cấp còn dữ liệu tham chiếu thì ngưng hoạt động — lệnh cũ vẫn đọc được tên.</dd>
  <dt>Mọi thay đổi có vết</dt><dd>Ai sửa, sửa gì, lúc nào — tra <strong>Nhật ký người dùng</strong>, không đoán.</dd>
  <dt>Tuyến đường là quan trọng nhất</dt><dd>Định mức dầu (cố định/tuyến hoặc theo chặng, núi/đồng bằng), số trạm thu phí, tiền lương tuyến, giá cước 20FT/40FT, phụ cấp đường theo tuyến × loại rơ-moóc, chặng Hàng/Vỏ — tất cả chụp theo lệnh khi tạo.</dd>
  <dt>Loại hàng hóa yêu cầu ảnh</dt><dd>Loại hàng bật cờ yêu cầu ảnh → khóa chuyến phải có <strong>cả ảnh container lẫn ảnh seal</strong>.</dd>
  <dt>Phí quản lý & kỳ lương</dt><dd>Phí quản lý trừ vào lợi nhuận ròng; kỳ lương mặc định tháng dương lịch, cấu hình được kỳ riêng.</dd>
</dl>

[![Trang cấu hình Định mức nhiên liệu theo xe, loại tải và loại tuyến](/ttransport/assets/giamdoc-config-norm.webp)](/ttransport/assets/giamdoc-config-norm.webp)

***Cấu hình Định mức nhiên liệu** — theo xe, loại tải (vỏ rỗng / dưới 20t / trên 20t) và loại tuyến (đồng bằng / núi).*
