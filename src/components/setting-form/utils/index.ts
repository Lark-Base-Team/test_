import { fieldMap, ExcelDataInfo } from '@/types/types.d';
import {
  IOpenCellValue,
  FieldType,
  IMultiSelectFieldMeta,
  ISingleSelectFieldMeta,
  IWidgetTable,
  IOpenSingleSelect,
  IOpenMultiSelect,
  IFieldConfig
} from "@base-open/web-api";
import { dateTime, dateDefaultFormat } from "./date";
import { multiSelect } from "./multiSelect";
import { singleSelect } from "./singleSelect";
import { checkBox, defaultBoolValue } from './checkBox';
import { text } from './text';
import { url } from './url';
import { phone } from './phone';
import { currency } from './currency';
import { progress } from './progress';
import { rating } from './rating';
import { barCode } from './barCode';
import {
  IFieldValue,
  IUndefinedFieldValue
} from "@/types/types.d";

export const ignoreFieldType = [
  FieldType.Lookup,
  FieldType.CreatedTime,
  FieldType.ModifiedTime,
  FieldType.Formula,
  FieldType.DuplexLink,
  FieldType.SingleLink,
  FieldType.CreatedUser,
  FieldType.ModifiedUser,
  FieldType.NotSupport,
  FieldType.Location,
  FieldType.AutoNumber,
  FieldType.GroupChat,
  FieldType.User,
  FieldType.Denied,
  FieldType.Attachment,
];

export const optionsFieldType = [
  FieldType.SingleSelect,
  FieldType.MultiSelect,
];

export async function getCellValue(fieldMap: fieldMap, value: string, table: IWidgetTable): Promise<IOpenCellValue> {
  console.log("input value", value)
  const type = fieldMap.field.type;
  const field = fieldMap.field;
  const config = fieldMap.config;
  if (!value) return value;
  switch (type) {
    case FieldType.Url:
      return url(value);
    case FieldType.DateTime:
      return dateTime(value, config?.format ?? dateDefaultFormat);
    case FieldType.SingleSelect:
      return singleSelect(value, field as ISingleSelectFieldMeta, table);
    case FieldType.MultiSelect:
      console.log("Hi multiSelect", value, field, config, config?.separator ?? ",")
      return multiSelect(value, field as IMultiSelectFieldMeta, table, config?.separator ?? ",");
    case FieldType.Number:
      return Number(value.match(/-?\d+\.?\d*/g));
    case FieldType.Currency:
      return currency(value);
    case FieldType.Progress:
      return progress(value);
    case FieldType.Rating:
      return rating(value);
    case FieldType.Checkbox:
      return checkBox(value, config?.boolValue ?? defaultBoolValue);
    case FieldType.Text:
      return text(value) as IOpenCellValue;
    case FieldType.Barcode:
      return barCode(value) as IOpenCellValue;
    case FieldType.Phone:
      return phone(value);
    default:
      return value;
  }
}

function compareCellValue(excelValue: string, tableValue: string, mode: "merge_direct" | "compare_merge"): string {
  if (mode === "compare_merge") {
    return excelValue ?? tableValue;
  }
  return excelValue;
}

function hasNewElement(target: string[], from: string[]): boolean {
  const res = !from.every((v) => target.includes(v));
  // console.log("hasNewElement", target, from, res);
  return res;
}

async function setOptionsField(fieldsMaps: fieldMap[], excelData: ExcelDataInfo, sheetIndex: number, table: IWidgetTable): Promise<fieldMap[]> {
  const optionsFields = fieldsMaps.filter((fieldMap) => optionsFieldType.includes(fieldMap.field.type));
  // refresh singleSelect and multiSelect options
  if (optionsFields.length > 0) {
    const selects: { id: string, config: IFieldConfig }[] = []
    optionsFields.forEach(optionsField => {
      // const field = table.getFieldById(optionsField.field.id);
      const tableOptions = optionsField.field.property.options.map((v: any) => v.name);
      const excelValues = Array.from(new Set(excelData.sheets[sheetIndex].tableData.records.map(v => {
        return Array.from((v[optionsField.excel_field] ?? "")?.split(optionsField.config?.separator ?? ",")) as string[];
      }).flat().filter(v => v !== "")));
      if (hasNewElement(tableOptions, excelValues)) {
        const options = Array.from(new Set([...tableOptions, ...excelValues])) as string[];
        selects.push({
          id: optionsField.field.id as string,
          config: {
            type: optionsField.field.type,
            name: optionsField.field.name,
            property: {
              options: options.map(v => ({ name: v }))
            }
          }
        })
      }
    });
    console.log(selects)
    // const optionsRecords: string[] = [];
    if (selects.length > 0) {
      await Promise.all(selects.map(async (select) => {
        let field = await table.getFieldById(select.id);
        const optionsRecords = await field.getFieldValueList();
        await table.setField(select.id, select.config);
        field = await table.getFieldById(select.id);
        const newMeta = await table.getFieldMetaById(select.id);
        fieldsMaps[fieldsMaps.findIndex(fieldMap => fieldMap.field.id === select.id)].field = newMeta as fieldMap["field"];
        const newOptions = (newMeta as (ISingleSelectFieldMeta | IMultiSelectFieldMeta)).property.options;
        console.log("newOptions", newOptions, optionsRecords)
        const setFieldRes = await Promise.all(optionsRecords.map(async (record) => {
          const id: string = record.record_id as string;
          if (select.config.type === FieldType.MultiSelect) {
            const value = (record.value as IOpenMultiSelect).map(v => {
              const option = newOptions.find(option => option.name === v.text);
              if (option) {
                return {
                  text: option.name,
                  id: option.id
                }
              }
            });
            const res = await table.setRecord(id, {
              // @ts-ignore
              fields: {
                [select.id]: value
              }
            });
            console.log("setMultiSelectRecord", res)
          }

          if (select.config.type === FieldType.SingleSelect) {
            const value = (record.value as IOpenSingleSelect);
            const option = newOptions.find(option => option.name === value.text);
            if (option) {
              const res = await table.setRecord(id, {
                fields: {
                  [select.id]: {
                    text: option.name,
                    id: option.id
                  }
                }
              });
              console.log("setSingleSelectRecord", res)
            }
          }
        }));
      }));
    }
  }
  return fieldsMaps;
}


export async function importExcel(
  fieldsMaps: fieldMap[],
  excelData: ExcelDataInfo,
  sheetIndex: number,
  table: IWidgetTable,
  index: string | null = null,
  mode: "append" | "merge_direct" | "compare_merge" = "append",
  callback?: (e: any) => void
) {

  fieldsMaps = await setOptionsField(fieldsMaps, excelData, sheetIndex, table);

  console.log("fieldMaps", fieldsMaps)
  const excelRecords = excelData.sheets[sheetIndex].tableData.records;
  const newRecords: any[] = [];
  if (mode === "append" || !index) {
    await Promise.all(excelRecords.map(async (record) => {
      const newRecord: { [key: string]: IOpenCellValue } = {};
      await Promise.all(fieldsMaps.map(async (fieldMap) => {
        const value = record[fieldMap.excel_field];
        if (value) {
          const tempValue = await getCellValue(fieldMap, value, table);
          if (tempValue) {
            newRecord[fieldMap.field.id] = tempValue;
          }
        }
      }));
      newRecords.push(newRecord);
    }));
    console.log("newRecords", newRecords)
  } else {
    let deleteList: any[] = [];
    const excelIndexField: fieldMap = fieldsMaps.find(fieldMap => fieldMap.excel_field === index) as fieldMap;;
    const indexField = await table.getFieldByName(index);
    const tableIndexRecords: (IFieldValue | IUndefinedFieldValue)[] = await indexField.getFieldValueList();
    console.log("excelIndexField", excelIndexField, tableIndexRecords)
    await Promise.all(excelRecords.map(async (record) => {
      console.log("record", record, excelIndexField)
      const indexValue = record[excelIndexField.excel_field];
      const sameRecords = tableIndexRecords.filter(tableIndexRecord => tableIndexRecord.value[0].text === indexValue);
      console.log("sameRecords", sameRecords, indexValue, tableIndexRecords)
      if (sameRecords.length === 0) {
        const newRecord: { [key: string]: IOpenCellValue } = {};
        await Promise.all(fieldsMaps.map(async (fieldMap) => {
          const value = record[fieldMap.excel_field];
          const tempValue = await getCellValue(fieldMap, value, table);
          if (tempValue) {
            newRecord[fieldMap.field.id] = tempValue;
          }
        }));
        newRecords.push(newRecord);
        console.log("newRecord", newRecord)
      } else {
        deleteList.push(...sameRecords.map(sameRecord => sameRecord.record_id));
        const newRecord: { [key: string]: IOpenCellValue } = {};
        await Promise.all(fieldsMaps.map(async (fieldMap) => {
          const field = await table.getFieldById(fieldMap.field.id);
          await Promise.all(sameRecords.map(async (sameRecord) => {
            const tableValue = await field.getCellString(sameRecord.record_id as string);
            console.log("table string value", tableValue)
            const excelValue = record[fieldMap.excel_field];
            const value = compareCellValue(excelValue, tableValue, mode);
            const tempValue = await getCellValue(fieldMap, value, table);
            if (tempValue) {
              newRecord[fieldMap.field.id] = tempValue;
            }
          }));
        }));
        newRecords.push(newRecord);
      }
    }));
    console.log(newRecords, deleteList)
    if (deleteList.length > 0) {
      deleteList = Array.from(new Set(deleteList));
      const deleteRes = await Promise.all(deleteList.map((id) => {
        if (typeof id === "string") return table.deleteRecord(id);
      }));
      console.log("deleteRes", deleteRes);
    }
  }
  console.log("start addRecords", newRecords)
  const addRes = await Promise.all(newRecords.map(async (record, index) => {
    console.log("addRecord", record, index, fieldsMaps.map(fieldMap => fieldMap.field));
    try {
      const res = await table.addRecord({ fields: record })
      return res;
    } catch (e) {
      console.error("addRecord error", e, index)
    }
  }))
  console.log("addRes", addRes)
  if (callback && typeof callback === "function") callback(addRes);
}
