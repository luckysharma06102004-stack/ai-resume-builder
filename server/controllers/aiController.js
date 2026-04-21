import Resume from "../models/Resume.js";
import ai from "../configs/ai.js";

// controller for enhancing a resume's professional summary
// POST: /api/ai/enhance-pro-sum
export const enhanceProfessionalSummary = async (req, res) => {
    try {
        const { userContent } = req.body;

        if(!userContent){
            return res.status(400).json({message: 'Missing required fields'})
        }

       const response = await ai.chat.completions.create({
            model: process.env.OPENAI_MODEL,
            messages: [
                { role: "system", content: "You are an expert in resume writing. Your task is to enhance the professional summary of a resume. The summary should be 1-2 sentences also highlighting key skills, experience, and career objectives. Make it compelling and ATS-friendly. and only return text no options or anything else." },
                {
                    role: "user",
                    content: userContent,
                },
    ],
        })

        const enhancedContent = response.choices[0].message.content;
        return res.status(200).json({enhancedContent})
    } catch (error) {
        return res.status(400).json({message: error.message})
    }
}

// controller for enhancing a resume's job description
// POST: /api/ai/enhance-job-desc
export const enhanceJobDescription = async (req, res) => {
    try {
        const { userContent } = req.body;

        if(!userContent){
            return res.status(400).json({message: 'Missing required fields'})
        }

       const response = await ai.chat.completions.create({
            model: process.env.OPENAI_MODEL,
            messages: [
                { role: "system",
                 content: "You are an expert in resume writing. Your task is to enhance the job description of a resume. The job description should be only in 1-2 sentence also highlighting key responsibilities and achievements. Use action verbs and quantifiable results where possible. Make it ATS-friendly. and only return text no options or anything else." },
                {
                    role: "user",
                    content: userContent,
                },
    ],
        })

        const enhancedContent = response.choices[0].message.content;
        return res.status(200).json({enhancedContent})
    } catch (error) {
        return res.status(400).json({message: error.message})
    }
}

// controller for uploading a resume to the database
// POST: /api/ai/upload-resume
export const uploadResume = async (req, res) => {
    try {
       
        const {resumeText, title} = req.body;
        const userId = req.userId;

        if(!resumeText){
            return res.status(400).json({message: 'Missing required fields'})
        }

        const systemPrompt = "You are an expert AI Agent to extract data from resume."

        const userPrompt = `extract data from this resume: ${resumeText}
        
        Provide data in the following JSON format with no additional text before or after:

        {
        professional_summary: { type: String, default: '' },
        skills: [{ type: String }],
        personal_info: {
            image: {type: String, default: '' },
            full_name: {type: String, default: '' },
            profession: {type: String, default: '' },
            email: {type: String, default: '' },
            phone: {type: String, default: '' },
            location: {type: String, default: '' },
            linkedin: {type: String, default: '' },
            website: {type: String, default: '' },
        },
        experience: [
            {
                company: { type: String },
                position: { type: String },
                start_date: { type: String },
                end_date: { type: String },
                description: { type: String },
                is_current: { type: Boolean },
            }
        ],
        project: [
            {
                name: { type: String },
                type: { type: String },
                description: { type: String },
            }
        ],
        education: [
            {
                institution: { type: String },
                degree: { type: String },
                field: { type: String },
                graduation_date: { type: String },
                gpa: { type: String },
            }
        ],          
        }
        `;

       const response = await ai.chat.completions.create({
            model: process.env.OPENAI_MODEL,
            messages: [
                { role: "system",
                 content: systemPrompt },
                {
                    role: "user",
                    content: userPrompt,
                },
        ],
        response_format: {type:  'json_object'}
        })

        const extractedData = response.choices[0].message.content;
        const parsedData = JSON.parse(extractedData)
        const newResume = await Resume.create({userId, title, ...parsedData})

        res.json({resumeId: newResume._id})
    } catch (error) {
        return res.status(400).json({message: error.message})
    }
}

// controller for deep resume analysis — health score, ATS score, keywords, readability
// POST: /api/ai/analyze-resume
export const analyzeResume = async (req, res) => {
    try {
        const { resumeData } = req.body;

        if (!resumeData) {
            return res.status(400).json({ message: 'Missing required fields' });
        }

        const systemPrompt = `You are a senior recruiter and ATS expert with 15+ years of experience at top companies. 
You deeply understand what makes resumes pass ATS filters and impress human recruiters.
Analyze resumes with brutal honesty and return ONLY a valid JSON object — no markdown, no explanation.`;

        const userPrompt = `
Analyze this resume thoroughly and return ONLY this exact JSON structure with no extra text:

Resume Data:
${JSON.stringify(resumeData)}

{
  "ats_score": <number 0-100, based on keyword density, action verbs, quantifiable results, formatting, completeness>,

  "health_score": <number 0-100, overall resume quality>,

  "completeness": {
    "score": <number 0-100>,
    "filled_sections": [<array of section names that are properly filled>],
    "missing_sections": [<array of section names that are empty or very weak>],
    "verdict": "<one sentence honest verdict>"
  },

  "content_quality": {
    "score": <number 0-100>,
    "action_verbs_used": <true or false>,
    "has_quantifiable_results": <true or false>,
    "summary_quality": "<poor | average | good | excellent>",
    "feedback": [<array of 3-4 specific actionable content improvement tips>]
  },

  "industry_keywords": {
    "score": <number 0-100>,
    "job_title": "<detected job title from resume personal_info or experience>",
    "present_keywords": [<array of strong industry keywords already found in resume>],
    "suggested_keywords": [<array of 6-8 high-impact keywords missing from resume, relevant to detected job title>],
    "verdict": "<one sentence verdict>"
  },

  "readability": {
    "score": <number 0-100>,
    "resume_length": "<too short | optimal | too long>",
    "dates_consistent": <true or false>,
    "contact_complete": <true or false>,
    "issues": [<array of formatting or readability issues found, empty array if none>],
    "verdict": "<one sentence verdict>"
  },

  "section_feedback": [
    {
      "section": "<section name>",
      "status": "<strong | average | weak>",
      "tip": "<specific actionable tip for this section>"
    }
  ],

  "top_strengths": [<array of 2-3 things the resume does really well>],

  "priority_fixes": [<array of top 3 most impactful things to fix right now, ordered by priority>]
}`;

        const response = await ai.chat.completions.create({
            model: process.env.OPENAI_MODEL,
            messages: [
                { role: "system", content: systemPrompt },
                { role: "user", content: userPrompt },
            ],
            response_format: { type: 'json_object' }
        });

        const result = JSON.parse(response.choices[0].message.content);
        return res.status(200).json({ analysisResult: result });
    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
}