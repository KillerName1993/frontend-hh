export interface Vacancy {
   id: string;
   name: string;
   salary: {
      from: number | null;
      to: number | null;
      currency: string;
   } | null;
   employer: {
      name: string;
   };
   area: {
      name: string;
   };
   experience: {
      name: string;
   };
   schedule: {
      name: string;
   };
   snippet: {
      requirement: string;
      responsibility: string;
   };
   alternate_url: string;
}

export interface VacanciesResponse {
   items: Vacancy[];
   found: number;
   pages: number;
   page: number;
   per_page: number;
}



