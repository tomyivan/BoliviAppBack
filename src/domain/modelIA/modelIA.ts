export interface IAResponseQuery {
    query?: string;
    table?: string;
    error?: string;
}
export interface IAResponseModel {
    id?:string,
    name?:string,
    content?:string,
    date?:string,
    summary?:string,
    img?:any[],
} 
export interface UserPetition {
    text: string;
}
export interface Promp {
    contents: Content[];
}

export interface Content {
    parts: Part[];
}

export interface Part {
    text: string;
}

export interface ResponseIA {
    candidates:    Candidate[];
    usageMetadata: UsageMetadata;
    modelVersion:  string;
}

export interface Candidate {
    content:      Content;
    finishReason: string;
    avgLogprobs:  number;
}

export interface Content {
    parts: Part[];
    role?:  string;
}

export interface Part {
    text: string;
}

export interface UsageMetadata {
    promptTokenCount:        number;
    candidatesTokenCount:    number;
    totalTokenCount:         number;
    promptTokensDetails:     TokensDetail[];
    candidatesTokensDetails: TokensDetail[];
}

export interface TokensDetail {
    modality:   string;
    tokenCount: number;
}
