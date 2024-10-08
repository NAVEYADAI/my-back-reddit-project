import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { HuggingFaceResponse } from './hugging-face.type';
import { HfInference, TextClassificationOutput } from "@huggingface/inference";


@Injectable()
export class HugginFaceService {
  
  async createGradeByHugging(text: string): Promise<number>{
      const inference = new HfInference(process.env.HUGGING_TOCKEN);
      const result = await inference.textClassification({
        model: "avichr/heBERT_sentiment_analysis",
        inputs: text,
      });
      return this.buildGrade( result );
  }

  async createGradeByHuggingWithApi(text: string): Promise<number>{
    try{
      const grade = await this.queryHuggingFaceApi(text);
      return this.buildGrade( grade );    
    }catch( error ){
      console.log('Error in api')
      throw error
    }
  }

  buildGrade(body: TextClassificationOutput): number{
    switch ( body[0].label ) {
        case 'negative':
          return Number( body[0].score * 0.4 ) ;
        case 'neutral':
          return Number( 0.4 + body[0].score * 0.2 );
        case 'positive':
          return Number( 0.6 + body[0].score * 0.4 );
        default: 
          return 0;
    } 
  }

    buildGradeForApi(body: HuggingFaceResponse[][]): number{
      switch ( body[0][0].label ) {
        case 'negative':
          return Number( body[0][0].score * 0.4 ) ;
        case 'neutral':
          return Number( 0.4 + body[0][0].score * 0.2 );
        case 'positive':
          return Number( 0.6 + body[0][0].score * 0.4 );
        default: 
          return 0;
      }   
    }

    async queryHuggingFaceApi(input: string) {
      const model = 'avichr/heBERT_sentiment_analysis'; // כאן תוכל להחליף את שם המודל במודל שתרצה
      
      try {
        const response = await axios.post(
          `https://api-inference.huggingface.co/models/${model}`,
          { inputs: input },
          {
            headers: {
              Authorization: `Bearer ${process.env.HUGGING_TOCKEN}`,
            },
          }
        );
      
        return response.data;
      } catch (error) {
        console.error('Error querying Hugging Face API:', error);
        throw error;
      }
    }
}