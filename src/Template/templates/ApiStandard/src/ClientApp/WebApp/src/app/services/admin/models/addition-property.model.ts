import { PropertyValueType } from '../enum/models/property-value-type.model';
export interface AdditionProperty {
  name: string;
  value: string;
  sort: number;
  isRequire: boolean;
  jsonValueType?: PropertyValueType | null;

}
