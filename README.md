# InsightX

**InsightX** is a web application designed to **share academic papers** and **enhance understanding through Generative AI**.  
By combining Retrieval-Augmented Generation (RAG) with Google's **Gemini**, InsightX allows users to explore academic content via an interactive chat interface.

[Demo Movie](https://drive.google.com/file/d/1XqNRzXSk_nuSfhTVLLsp0Pv0gqpbiGNr/view?usp=sharing)

<img src="https://github.com/user-attachments/assets/165f1eb5-8e66-4f70-a58d-a15721c9a423" width="300" alt="Description of image">

---

## 🚀 Features

-   Upload & Share Academic Papers (PDF)
-   Chat with Generative AI to analyze papers
-   User Profile Management  
    ※ Backend logging included

---

## 🛠 Tech Stack

**Frontend**

-   React
-   Vite
-   Tailwind CSS
-   shadcn/ui

**Backend**

-   TypeScript
-   NestJS
-   JSON Web Token (JWT)
-   Google OAuth
-   Supabase

**Others**

-   Gemini (LLM) : https://ai.google.dev/api
-   Supavec (RAG) : https://docs.supavec.com/

---

## 🔄 How It Works

1. User uploads/selects an academic paper.
2. Supavec extracts content using RAG.
3. Extracted content + user query → Prompt for Gemini.
4. Gemini generates a contextual response.

### 📌 Flow Diagram

```plaintext
[User Uploads PDF]
        ↓
[Supavec Extracts Content (RAG)]
        ↓
[User Sends a Message in Chat]
        ↓
[Prompt (User Message + Extracted Content)]
        ↓
[Gemini]
        ↓
[Response Displayed to User]
```
