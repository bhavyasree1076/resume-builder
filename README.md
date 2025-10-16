# Resume Builder

A comprehensive, professional resume builder application built with Next.js 15, TypeScript, and modern web technologies. Create, edit, and export beautiful resumes in minutes.

## 🚀 Features

### Core Functionality
- **Interactive Resume Builder**: Easy-to-use form interface for creating professional resumes
- **Real-time Preview**: See your resume update as you type
- **Multiple Templates**: Choose from various professional templates (Modern, Classic, Creative, Minimal)
- **PDF Export**: Export your resume as a high-quality PDF file
- **Save & Load**: Save multiple resumes and load them anytime
- **Responsive Design**: Works perfectly on desktop, tablet, and mobile devices

### Resume Sections
- **Personal Information**: Name, contact details, social links
- **Professional Summary**: Career overview and objectives
- **Work Experience**: Job history with descriptions
- **Education**: Academic background and qualifications
- **Skills**: Technical and soft skills with proficiency levels
- **Projects**: Portfolio projects with descriptions
- **Certifications**: Professional certifications
- **Languages**: Spoken languages with proficiency

### Technical Features
- **Database Storage**: SQLite with Prisma ORM for data persistence
- **RESTful API**: Full CRUD operations for resume management
- **Modern UI**: Built with shadcn/ui components and Tailwind CSS
- **Type Safety**: Full TypeScript implementation
- **Error Handling**: Comprehensive error handling and user feedback

## 🛠️ Technology Stack

### Frontend
- **Next.js 15**: React framework with App Router
- **TypeScript 5**: Type-safe JavaScript
- **Tailwind CSS 4**: Utility-first CSS framework
- **shadcn/ui**: Modern component library
- **Lucide React**: Beautiful icon library
- **React Hook Form**: Form management
- **Zod**: Schema validation

### Backend
- **Next.js API Routes**: Server-side API endpoints
- **Prisma ORM**: Database ORM and query builder
- **SQLite**: Lightweight database for development

### Additional Libraries
- **jsPDF**: PDF generation
- **html2canvas**: HTML to image conversion
- **Sonner**: Toast notifications
- **Framer Motion**: Smooth animations

## 📦 Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd resume-builder
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up the database**
   ```bash
   npm run db:push
   ```

4. **Start the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🎯 Usage

### Creating a Resume

1. **Fill in Personal Information**
   - Enter your name, email, phone, and location
   - Add your website, LinkedIn, and GitHub profiles

2. **Add Professional Summary**
   - Write a brief overview of your career and goals

3. **Add Work Experience**
   - Click "Add Experience" for each job
   - Fill in company, position, dates, and description
   - Use the arrow buttons to reorder experiences

4. **Add Education**
   - Add your educational background
   - Include institution, degree, field, and dates

5. **Add Skills**
   - Categorize your skills (Technical, Soft Skills, etc.)
   - Set proficiency levels for each skill

6. **Add Projects (Optional)**
   - Showcase your portfolio projects
   - Include descriptions and links

7. **Add Certifications & Languages (Optional)**
   - List professional certifications
   - Add spoken languages with proficiency

### Managing Resumes

1. **Save Your Resume**
   - Click "Save Resume" to store your work
   - Your resume is saved to the database

2. **Load Previous Resumes**
   - Click "My Resumes" to see all saved resumes
   - Click "Load" to edit a previous resume
   - Click "Delete" to remove unwanted resumes

3. **Change Templates**
   - Click "Change Template" to browse different styles
   - Select a template that fits your industry

4. **Export to PDF**
   - Switch to the "Preview" tab
   - Click "Export as PDF" to download your resume

## 🏗️ Project Structure

```
src/
├── app/
│   ├── api/
│   │   ├── resumes/          # Resume API endpoints
│   │   └── users/            # User API endpoints
│   ├── globals.css           # Global styles
│   ├── layout.tsx            # Root layout
│   └── page.tsx              # Main page
├── components/
│   ├── ui/                   # shadcn/ui components
│   ├── resume-builder.tsx    # Main form component
│   ├── resume-preview.tsx    # Preview component
│   └── template-selector.tsx # Template selection
├── hooks/
│   └── use-toast.ts          # Toast notifications
├── lib/
│   ├── db.ts                 # Database client
│   ├── pdf-export.ts         # PDF export utilities
│   ├── socket.ts             # WebSocket setup
│   └── utils.ts              # Utility functions
└── prisma/
    └── schema.prisma         # Database schema
```

## 🔧 Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run db:push` - Push database schema
- `npm run db:generate` - Generate Prisma client
- `npm run db:migrate` - Run database migrations
- `npm run db:reset` - Reset database

### Database Schema

The application uses SQLite with the following main models:

- **User**: Stores user information
- **Resume**: Stores resume data with JSON fields for flexible content

### API Endpoints

- `GET /api/resumes?userId=<id>` - Get user's resumes
- `POST /api/resumes` - Create new resume
- `GET /api/resumes/<id>` - Get specific resume
- `PUT /api/resumes/<id>` - Update resume
- `DELETE /api/resumes/<id>` - Delete resume
- `POST /api/users` - Create/get user
- `GET /api/users?email=<email>` - Get user by email

## 🎨 Customization

### Adding New Templates

1. Create a new template component in `src/components/templates/`
2. Add the template to the `templates` array in `template-selector.tsx`
3. Implement the template logic in `resume-preview.tsx`

### Modifying the Database Schema

1. Update `prisma/schema.prisma`
2. Run `npm run db:push` to apply changes
3. Update API endpoints accordingly

### Adding New Sections

1. Add the section to the database schema
2. Update the form in `resume-builder.tsx`
3. Add the section to the preview in `resume-preview.tsx`

## 🚀 Deployment

### Environment Variables

Create a `.env` file with:

```env
DATABASE_URL="file:./db/custom.db"
```

### Production Build

```bash
npm run build
npm run start
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🙏 Acknowledgments

- Built with [Next.js](https://nextjs.org/)
- UI components by [shadcn/ui](https://ui.shadcn.com/)
- Styling with [Tailwind CSS](https://tailwindcss.com/)
- Icons by [Lucide](https://lucide.dev/)
- Database by [Prisma](https://www.prisma.io/)

## 📞 Support

For support, please open an issue in the GitHub repository or contact the development team.

---

**Resume Builder** - Create professional resumes with ease! 🚀