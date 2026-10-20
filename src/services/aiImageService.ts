export type StudentImageStyle = 'Modern Lab' | 'Computer Technology' | 'AI & Coding' | 'Photorealistic Studio' | 'Cyber Neon' | '3D Digital Art' | string;

export interface GenerateAiImageParams {
  prompt: string;
  aspectRatio?: '1:1' | '16:9' | '4:3' | '9:16';
  style?: StudentImageStyle;
  action?: 'generate' | 'edit';
  editImageBase64?: string;
}

export interface GenerateAiImageResponse {
  success: boolean;
  imageUrl: string;
  base64Data?: string;
  engineUsed: string;
  error?: string;
}

export const STUDENT_IMAGE_PROMPTS = [
  {
    titleBn: 'কুষ্টিয়া বেঙ্গল ইনস্টিটিউট এআই ল্যাব',
    titleEn: 'Bengal Institute Modern AI Lab',
    prompt: 'A modern futuristic computer and artificial intelligence training lab in Kushtia, students working on dual-monitor PCs learning coding, glowing neon cyan and emerald lighting, photorealistic 8k',
    style: 'photorealistic' as const,
    aspectRatio: '16:9' as const
  },
  {
    titleBn: 'HSC আইসিটি ও প্র্যাকটিক্যাল কোডিং',
    titleEn: 'HSC ICT Coding & Circuit Design',
    prompt: 'Bangladeshi college student happily practicing C programming on a modern laptop with logic gates diagrams and certificate on the desk, ultra-detailed, inspiring classroom setting',
    style: 'photorealistic' as const,
    aspectRatio: '1:1' as const
  },
  {
    titleBn: 'ফ্রিল্যান্সার আর্নিং ও সাকসেস স্টুডিও',
    titleEn: 'Freelancer Earning Online with Fiverr',
    prompt: 'A successful young Bangladeshi freelancer in Kushtia working on web development project, international client dashboard, receiving dollar payments, modern cozy desk setup, cinematic lighting',
    style: 'photorealistic' as const,
    aspectRatio: '16:9' as const
  },
  {
    titleBn: 'সিঙ্গার মোড় জনতা ব্যাংক ভবন ক্যাম্পাস',
    titleEn: 'Singer Mor Janata Bank Building Campus',
    prompt: 'Architectural illustration of Bengal Computer Training Institute located at Singer Mor Kushtia, Janata Bank building first floor, modern illuminated signboards, lively urban Bangladeshi street',
    style: '3d-render' as const,
    aspectRatio: '4:3' as const
  },
  {
    titleBn: 'সাইবার সিকিউরিটি ও এথিক্যাল হ্যাকিং',
    titleEn: 'Cyber Security & Network Defense',
    prompt: 'Cyber security analyst protecting computer systems, glowing matrix digital code, shield hologram, terminal interface Kali Linux, cyberpunk neon aesthetics',
    style: 'cyber-neon' as const,
    aspectRatio: '16:9' as const
  },
  {
    titleBn: 'গ্রাফিক ডিজাইন ও ডিজিটাল আর্টওয়ার্ক',
    titleEn: 'Graphic Design & Digital Art',
    prompt: 'Creative graphic designer working with drawing tablet and color palette creating modern brand identity and vector illustrations, artistic lighting',
    style: 'anime' as const,
    aspectRatio: '1:1' as const
  }
];

export async function requestGenerateImage(params: GenerateAiImageParams): Promise<GenerateAiImageResponse> {
  const { prompt, aspectRatio = '1:1', style = 'photorealistic', action = 'generate', editImageBase64 } = params;

  try {
    const res = await fetch('/api/gemini/generate-image', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        prompt,
        aspectRatio,
        style,
        action,
        editImageBase64
      }),
    });

    if (res.ok) {
      const data = await res.json();
      if (data && data.success && data.imageUrl) {
        return {
          success: true,
          imageUrl: data.imageUrl,
          base64Data: data.base64Data,
          engineUsed: data.engineUsed || 'gemini-3.1-flash-image-preview',
        };
      }
    }
  } catch (err) {
    console.warn('Backend API request failed, falling back to client synthesis:', err);
  }

  // Client-side Direct Free AI Generation Fallback
  try {
    const dimensionsMap: Record<string, { w: number; h: number }> = {
      '1:1': { w: 1024, h: 1024 },
      '16:9': { w: 1280, h: 720 },
      '9:16': { w: 720, h: 1280 },
      '4:3': { w: 1024, h: 768 }
    };
    const { w, h } = dimensionsMap[aspectRatio] || dimensionsMap['1:1'];
    const seed = Math.floor(Math.random() * 9999999);
    let finalPrompt = prompt.trim();
    const lowerStyle = (style || '').toLowerCase();

    if (lowerStyle.includes('modern lab')) {
      finalPrompt += ', modern high-tech computer training laboratory, dual screen workstations, sleek educational campus, photorealistic 8k';
    } else if (lowerStyle.includes('computer technology')) {
      finalPrompt += ', cutting-edge computer technology, glowing circuitry, digital programming interface, modern hardware setup, sharp focus, 8k';
    } else if (lowerStyle.includes('ai') || lowerStyle.includes('coding')) {
      finalPrompt += ', artificial intelligence and coding environment, futuristic data visualization, neon cyan and emerald accents';
    } else if (lowerStyle.includes('cyber') || lowerStyle.includes('neon')) {
      finalPrompt += ', neon glow, cyberpunk aesthetics, modern tech';
    } else if (lowerStyle.includes('3d') || lowerStyle.includes('render')) {
      finalPrompt += ', 3d isometric render, blender digital art, smooth lighting';
    } else {
      finalPrompt += ', photorealistic, 8k, sharp focus, cinematic lighting';
    }

    const directUrl = `https://image.pollinations.ai/prompt/${encodeURIComponent(finalPrompt)}?width=${w}&height=${h}&seed=${seed}&nologo=true&enhance=true&model=flux`;
    
    return {
      success: true,
      imageUrl: directUrl,
      engineUsed: 'free-ai-flux'
    };
  } catch (fallbackErr: any) {
    return {
      success: false,
      imageUrl: '',
      engineUsed: 'none',
      error: fallbackErr?.message || 'Failed to generate image'
    };
  }
}
