# Hướng Dẫn Cho Developer

## Tổng Quan Dự Án

Đây là portfolio website để showcase các design projects. Được xây dựng bằng:
- **Next.js 14** (App Router)
- **TypeScript**
- **Tailwind CSS**
- **MDX** (Markdown + React components)

---

## Cài Đặt & Chạy

```bash
# Clone repo
git clone https://github.com/kaynguyenhcmc-sudo/design-portfolio.git
cd design-portfolio

# Cài dependencies
npm install

# Chạy development server
npm run dev

# Mở http://localhost:3000
```

---

## Cấu Trúc Thư Mục

```
design-portfolio/
├── src/
│   ├── app/
│   │   ├── page.tsx                    # Trang Home (danh sách projects)
│   │   └── project/[slug]/page.tsx     # Template trang chi tiết project
│   │
│   ├── components/
│   │   ├── mdx/                        # Components dùng chung cho MDX
│   │   │   ├── HeroVideo.tsx
│   │   │   ├── HeroImage.tsx
│   │   │   ├── Section.tsx
│   │   │   ├── MockupImage.tsx
│   │   │   ├── VideoEmbed.tsx
│   │   │   ├── KPIGroup.tsx
│   │   │   ├── KPI.tsx
│   │   │   ├── QuoteCarousel.tsx
│   │   │   └── TimelineInfographic.tsx
│   │   │
│   │   └── projects/                   # Components riêng theo project
│   │       ├── redaction-studio/       # → Người 1
│   │       ├── axon-performance/       # → Người 2
│   │       └── axon-autotagging/       # → Người 2
│   │
│   ├── content/projects/               # NỘI DUNG CÁC PROJECTS (MDX)
│   │   ├── redaction-studio/
│   │   │   └── index.mdx               # → Người 1
│   │   ├── axon-performance/
│   │   │   └── index.mdx               # → Người 2
│   │   └── axon-autotagging/
│   │       └── index.mdx               # → Người 2
│   │
│   └── lib/
│       └── projects.ts                 # Logic đọc danh sách projects
│
├── public/projects/                    # HÌNH ẢNH CÁC PROJECTS
│   ├── redaction-studio/images/        # → Người 1
│   ├── axon-performance/images/        # → Người 2
│   └── axon-autotagging/images/        # → Người 2
│
└── tailwind.config.ts                  # Cấu hình màu sắc, fonts
```

---

## Phân Công Công Việc

| Người | Projects | Thư mục được sửa |
|-------|----------|------------------|
| **Người 1** | Redaction Studio + Home | `redaction-studio/`, `app/`, `components/mdx/` |
| **Người 2** | Axon Performance, Axon Autotagging | `axon-performance/`, `axon-autotagging/` |

### ⚠️ Quy Tắc Tránh Conflict

- **Người 2** chỉ làm việc trong thư mục của mình
- **KHÔNG** sửa các file: `app/page.tsx`, `app/project/[slug]/page.tsx`
- Nếu cần component mới → tạo trong `components/projects/[tên-project]/`
- Nếu cần đăng ký component mới vào MDX → báo Người 1

---

## Cách Tạo/Sửa Nội Dung Project

### 1. Cấu trúc file MDX

Mỗi project có 1 file `index.mdx` trong `src/content/projects/[tên-project]/`

```mdx
---
title: "Tên Project"
role: "Product Designer"
timeline: "2024"
description: "Mô tả ngắn về project"
---

<HeroVideo 
  url="https://vimeo.com/123456789"
  title="Tên video"
/>

<Section title="Overview">
Nội dung overview...
</Section>

<MockupImage 
  src="https://dropbox.com/.../image.png?raw=1" 
  alt="Mô tả" 
  caption="Caption"
/>
```

### 2. Components có sẵn

| Component | Công dụng | Ví dụ |
|-----------|-----------|-------|
| `HeroVideo` | Video hero tự động chạy với overlay | `<HeroVideo url="..." title="..." />` |
| `HeroImage` | Hình hero | `<HeroImage src="..." alt="..." tagline="..." />` |
| `Section` | Khối nội dung có tiêu đề | `<Section title="...">Nội dung</Section>` |
| `MockupImage` | Hình mockup (click phóng to) | `<MockupImage src="..." alt="..." caption="..." />` |
| `VideoEmbed` | Embed YouTube/Vimeo | `<VideoEmbed url="..." title="..." />` |
| `KPIGroup` + `KPI` | Hiển thị số liệu | Xem ví dụ bên dưới |
| `QuoteCarousel` | Carousel trích dẫn | Xem ví dụ bên dưới |
| `TimelineInfographic` | Timeline infographic | Xem ví dụ bên dưới |

### 3. Ví dụ chi tiết

**KPI Group:**
```mdx
<KPIGroup>
  <KPI metric="70%" label="Faster workflow" />
  <KPI metric="10 min" label="Processing time" />
  <KPI metric="+3" label="New features" />
</KPIGroup>
```

**Quote Carousel:**
```mdx
<QuoteCarousel quotes={[
  {
    quote: "Nội dung quote 1",
    source: "Nguồn 1"
  },
  {
    quote: "Nội dung quote 2",
    source: "Nguồn 2"
  }
]} intervalMs={5500} />
```

**Timeline Infographic:**
```mdx
<TimelineInfographic 
  nodes={[
    {
      year: "2024",
      title: "Phase 1",
      description: "Mô tả phase 1",
      image: "https://dropbox.com/.../image1.png?raw=1"
    },
    {
      year: "2025",
      title: "Phase 2",
      description: "Mô tả phase 2",
      image: "https://dropbox.com/.../image2.png?raw=1"
    }
  ]}
/>
```

---

## Cách Sử Dụng Hình Ảnh

### Option 1: Dropbox (Khuyến nghị cho file lớn)

1. Upload lên Dropbox
2. Lấy link chia sẻ
3. Đổi `dl=0` thành `raw=1` ở cuối URL

```
# Link gốc
https://www.dropbox.com/scl/fi/xxx/image.png?...&dl=0

# Link sử dụng (đổi dl=0 → raw=1)
https://www.dropbox.com/scl/fi/xxx/image.png?...&raw=1
```

### Option 2: File local (chỉ cho file < 100MB)

1. Đặt file trong `public/projects/[tên-project]/images/`
2. Sử dụng path: `/projects/[tên-project]/images/filename.png`

---

## Cách Tạo Component Mới

### Bước 1: Tạo file component

```
src/components/projects/axon-performance/MyNewComponent.tsx
```

```tsx
"use client";

interface MyNewComponentProps {
  title: string;
  data: string[];
}

export default function MyNewComponent({ title, data }: MyNewComponentProps) {
  return (
    <div className="my-8">
      <h3 className="text-xl font-semibold text-text-primary">{title}</h3>
      <ul>
        {data.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
    </div>
  );
}
```

### Bước 2: Báo Người 1 để đăng ký component

Người 1 sẽ thêm vào `src/app/project/[slug]/page.tsx`:

```tsx
import MyNewComponent from "@/components/projects/axon-performance/MyNewComponent";

const components = {
  // ... existing components
  MyNewComponent,
};
```

### Bước 3: Sử dụng trong MDX

```mdx
<MyNewComponent 
  title="My Title" 
  data={["Item 1", "Item 2", "Item 3"]} 
/>
```

---

## Màu Sắc (Theme)

Định nghĩa trong `tailwind.config.ts`:

| Tên | Giá trị | Sử dụng |
|-----|---------|---------|
| `background` | `#0a0a0b` | Nền trang |
| `surface` | `#121214` | Nền card |
| `surface-elevated` | `#1a1a1d` | Nền card nổi |
| `text-primary` | `#fafafa` | Text chính |
| `text-secondary` | `rgba(250,250,250,0.7)` | Text phụ |
| `text-muted` | `rgba(250,250,250,0.45)` | Text mờ |
| `accent` | `#FEC62E` | Màu nhấn (vàng gold) |
| `accent-hover` | `#E6A817` | Hover accent |
| `border` | `rgba(255,255,255,0.08)` | Viền |

---

## Git Workflow

### Trước khi làm việc
```bash
git pull origin main
```

### Sau khi hoàn thành
```bash
git add .
git commit -m "Mô tả thay đổi"
git push origin main
```

### Nếu có conflict
```bash
git pull origin main
# Giải quyết conflict trong editor
git add .
git commit -m "Resolve conflicts"
git push origin main
```

---

## Liên Hệ

- **Người 1**: Phụ trách Home, Redaction Studio, Components chung
- **Người 2**: Phụ trách Axon Performance, Axon Autotagging

Khi cần hỗ trợ hoặc có thắc mắc, liên hệ Người 1.

