# Inventory Management System (React + Tailwind + Appwrite)

## চালানোর ধাপ (Windows, VS Code)

1. ZIP টা Extract করুন, `inventory-ms` ফোল্ডারটা VS Code এ খুলুন (File > Open Folder)।
2. Appwrite এ ৫টা Table বানান (কলামের নাম ছোট হাতের)। সব নাম আর ধাপ PDF এর **Part 2** এ আছে।
3. `.env` ফাইল খুলে `paste-your-...` লেখাগুলোর জায়গায় নিজের Appwrite আইডি বসান।
4. টার্মিনাল খুলুন (Ctrl + `) আর চালান:

       npm install
       npm run dev

5. ব্রাউজারে `http://localhost:5173` খুলুন।

`.env` বদলালে `npm run dev` বন্ধ (Ctrl + C) করে আবার চালাতে হবে।

## ফোল্ডার

- `src/appwrite`: Appwrite এর সব কাজ (auth.js, service.js)
- `src/components`: ছোট ছোট UI অংশ (Input, Button, Sidebar...)
- `src/pages`: পেজ (Login, admin/*, employee/*)
- `src/store`: Redux (লগইন তথ্য)
