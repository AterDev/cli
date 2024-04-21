import { SolutionType } from '../enum/solution-type.model';
import { EntityInfo } from '../entity-info.model';
import { ApiDocInfo } from '../api-doc/api-doc-info.model';
import { ConfigData } from '../advance/config-data.model';
import { TemplateFile } from '../project/template-file.model';
/**
 * 项目
 */
export interface Project {
  id: string;
  /**
   * 项目名称
   */
  name: string;
  /**
   * 显示名
   */
  displayName: string;
  /**
   * 路径
   */
  path: string;
  /**
   * 版本
   */
  version?: string | null;
  solutionType?: SolutionType | null;
  entityInfos?: EntityInfo[];
  apiDocInfos?: ApiDocInfo[];
  configDatas?: ConfigData[];
  templateFiles?: TemplateFile[];

}
