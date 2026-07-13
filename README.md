# 🚗 DriveFleet - Full-Stack Car Rental Platform

DriveFleet holo akta modern, full-stack car rental application jekhane user-ra khub shojei gari explore ebong rent korte parben[cite: 1]. Ete secure authentication, dynamic booking system abong responsive modern dashboard UI royeche[cite: 1].

🌐 **Live Site URL:** https://car-rental-platfrom.vercel.app/ 

---

<img width="1919" height="946" alt="Screenshot 2026-07-13 214907" src="https://github.com/user-attachments/assets/8750ced7-d45d-42c2-92d6-a9ddec128bf7" />
<img width="1919" height="945" alt="Screenshot 2026-07-13 214921" src="https://github.com/user-attachments/assets/8b02d8ce-18a2-4b4f-ad3b-92a172f6f473" />
## 🚀 Key Features

* **Secure Authentication (JWT & Google Login):** Email/Password ebong Google Social Login-er maddhome secure authentication, ja JWT token-ke HTTPOnly Cookie-te store kore session maintain kore[cite: 1].
* **Comprehensive CRUD Operations:** Logged-in user-ra database-e nijeder gari add, view, update ebong confirmation modal-er maddhome delete korte parben[cite: 1].
* **Dynamic Booking System:** Driver commitment ebong special note shoho dynamic car booking system, ja boooking-er shathe shathe MongoDB `$inc` operator diye car booking count bray[cite: 1].
* **Advanced Search & Filter:** Car name diye MongoDB `$regex` match/search ebong car type (SUV, Sedan, Luxury, etc.) onusare instant dynamic filtering[cite: 1].
* **Robust Private Routing & Error Handling:** Reload korle private route theke login-e redirect hobe na[cite: 1]. Shone royeche custom 404 page, seamless loading spinner ebong custom alerts (toast messages)[cite: 1].

---

## 🛠️ Tech Stack

**Client Side:**
* React.js / Next.js[cite: 1]
* Tailwind CSS & DaisyUI / HeroUI[cite: 1]
* Framer Motion (Animations)[cite: 1]
* React Hook Form / Axios / React Toastify[cite: 1]

**Server Side:**
* Node.js & Express.js[cite: 1]
* MongoDB (Database)[cite: 1]
* JSON Web Token (JWT) with HTTPOnly Cookies[cite: 1]
* Dotenv (Environment Variables Security)[cite: 1]

---

## 📦 NPM Packages Used

* `express` - Backend server routing framework.
* `mongoose` - MongoDB object modeling tool.
* `jsonwebtoken` - Secure authentication token generation[cite: 1].
* `cookie-parser` - HTTPOnly cookie handling[cite: 1].
* `cors` - Cross-Origin Resource Sharing handling[cite: 1].
* `dotenv` - Environment variable management[cite: 1].
* `react-router-dom` - Client-side dynamic routing.
* `react-toastify` / `sweetalert2` - Custom validation/success messages[cite: 1].

---

## 💻 Local Setup & Installation

Projectটি আপনার লোকাল মেশিনে রান করতে নিচের ধাপগুলো অনুসরণ করুন:

### 1. Client Side Setup
```bash
# Repository Clone করুন
git clone [Apnar Client Repo URL]
cd drivefleet-client

# Dependencies Install করুন
npm install

# .env.local File তৈরি করে নিচের ভ্যারিয়েবল দিন
VITE_API_URL=http://localhost:5000

# Project রান করুন
npm run dev
