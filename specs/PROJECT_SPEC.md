# InnovatEPAM Portal Specification

## 1. Project Overview

**Project Name**: InnovatEPAM Portal  
**Version**: 1.0.0  
**Status**: In Development  
**Last Updated**: May 14, 2026

InnovatEPAM Portal is an employee innovation management platform designed to:
- Enable employees to submit and track innovation ideas
- Allow admins to review, comment, and decide on ideas
- Provide transparent tracking of innovation submissions

## 2. Target Users

### Primary Users
- **Employees**: Submit ideas, track status, receive feedback
- **Administrators**: Review ideas, provide feedback, make decisions

### Secondary Users
- **Managers**: View team submissions and progress
- **Executives**: Access reports and dashboards (future)

## 3. Core Features

### 3.1 Authentication
- User registration (email, password, name)
- User login
- Session management
- Role-based access (Employee, Admin)
- Logout functionality

### 3.2 Idea Management
- **Submit Idea**: Employees can create ideas with:
  - Title
  - Description
  - Category (optional)
  - Single file attachment (optional)
  
- **View Ideas**: 
  - Employees see their own ideas
  - Admins see all ideas
  
- **Edit Ideas**: 
  - Employees can edit ideas before review
  - Status changes prevent editing
  
- **Delete Ideas**:
  - Employees can delete their own ideas (before review)

### 3.3 Admin Functions
- Review dashboard with submitted ideas
- Add comments to ideas
- Accept ideas with feedback
- Reject ideas with reason
- Track idea status changes
- View idea history

### 3.4 Status Workflow
```
Draft → Submitted → Under Review → (Accepted | Rejected)
```

**Status Meanings**:
- **Draft**: Not yet submitted
- **Submitted**: Waiting for review
- **Under Review**: Currently being reviewed
- **Accepted**: Approved for implementation
- **Rejected**: Not approved

## 4. Data Model

### 4.1 User Model
```typescript
interface User {
  id: string;
  email: string;
  password: string (hashed);
  name: string;
  role: "employee" | "admin";
  createdAt: Date;
  updatedAt: Date;
}
```

### 4.2 Idea Model
```typescript
interface Idea {
  id: string;
  title: string;
  description: string;
  category: string;
  status: "draft" | "submitted" | "under_review" | "accepted" | "rejected";
  fileAttachmentUrl: string | null;
  createdById: string;
  createdAt: Date;
  updatedAt: Date;
}
```

### 4.3 Comment Model
```typescript
interface Comment {
  id: string;
  content: string;
  ideaId: string;
  userId: string;
  createdAt: Date;
  updatedAt: Date;
}
```

## 5. User Stories

### Story 1: Employee Registration
**As an** employee  
**I want to** register an account  
**So that** I can access the innovation platform

**Acceptance Criteria**:
- User can fill registration form with email, name, password
- Email validation (unique, valid format)
- Password strength validation (min 8 chars, complexity)
- Registration success shows login page
- Duplicate email shows error message

### Story 2: Employee Login
**As an** employee  
**I want to** log in with my credentials  
**So that** I can access my dashboard

**Acceptance Criteria**:
- User can enter email and password
- Invalid credentials show error
- Successful login redirects to dashboard
- Session persists across page refreshes
- Logout clears session

### Story 3: Submit Innovation Idea
**As an** employee  
**I want to** submit an innovation idea  
**So that** management can review it

**Acceptance Criteria**:
- User can fill form: title, description, category, file
- Title is required (min 5 chars)
- Description is required (min 20 chars)
- File attachment is optional (max 5MB, PDF/DOC)
- Submit button validates and saves idea
- Success message confirms submission
- Idea status changes to "submitted"

### Story 4: Admin Review Dashboard
**As an** admin  
**I want to** see all submitted ideas  
**So that** I can review and provide feedback

**Acceptance Criteria**:
- Admin sees table/list of ideas with status
- Ideas are sortable by date, status, category
- Ideas are filterable by status
- Admin can click idea to see details
- Admin can add comments to ideas
- Admin can change idea status (accept/reject)

### Story 5: View Idea Status
**As an** employee  
**I want to** see the status of my submitted ideas  
**So that** I know the progress of my submissions

**Acceptance Criteria**:
- Employees see "My Ideas" dashboard
- Each idea shows current status
- Status shows timestamp of last change
- Comments from admins are visible
- Ideas can be sorted by status/date

## 6. API Endpoints (Planned)

```
POST   /api/auth/register        - User registration
POST   /api/auth/login           - User login
POST   /api/auth/logout          - User logout

GET    /api/ideas                - List ideas
POST   /api/ideas                - Create idea
GET    /api/ideas/:id            - Get idea details
PATCH  /api/ideas/:id            - Update idea
DELETE /api/ideas/:id            - Delete idea

POST   /api/ideas/:id/comments   - Add comment
GET    /api/ideas/:id/comments   - Get comments

POST   /api/ideas/:id/accept     - Admin: accept idea
POST   /api/ideas/:id/reject     - Admin: reject idea
```

## 7. UI Components (Planned)

### Pages
- `/` - Home/Login page
- `/register` - Registration page
- `/dashboard` - Employee dashboard
- `/ideas` - My ideas list
- `/ideas/:id` - Idea details
- `/admin` - Admin dashboard
- `/admin/ideas` - Admin review list

### Components
- Navigation bar
- Login form
- Registration form
- Idea submission form
- Idea list item
- Idea detail view
- Comments section
- Admin controls

## 8. Design Considerations

### Accessibility
- WCAG 2.1 AA compliance
- Keyboard navigation
- Screen reader support
- Color contrast requirements

### Responsive Design
- Mobile (< 768px)
- Tablet (768px - 1024px)
- Desktop (> 1024px)

### Performance
- Page load < 3s
- Lazy loading for images
- Code splitting by routes
- Efficient database queries

## 9. Security Requirements

- Password hashing (bcrypt)
- Secure session management
- CSRF protection
- Input validation and sanitization
- File upload security
- Role-based access control

## 10. Future Enhancements

- [ ] Idea categories and tags
- [ ] Email notifications
- [ ] Idea voting system
- [ ] Reports and analytics
- [ ] Export functionality
- [ ] API documentation
- [ ] Dark mode
- [ ] Multi-language support

## 11. Success Metrics

- User registration/login success rate > 99%
- Page load time < 3s
- Idea submission completion rate > 90%
- Admin review time avg < 5 minutes per idea
- User satisfaction score > 4/5

---

**Status**: Specification Complete - Ready for Implementation
