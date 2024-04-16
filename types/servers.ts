export interface Method {
  type: string;
  name: string;
  desc: string;
  lang: { name: string; code: string }[];
}

export interface Params {
  main: { id: number; name: string; value: string }[];
  additional: { param: string };
}

export interface Response {
  status: number;
  code: string;
}

export interface serverData {
  name: string;
  value: string;
  methods: Method[];
  params: Params;
  response: Response;
}

export interface NameValuePair {
  name: string;
  value: string;
}
