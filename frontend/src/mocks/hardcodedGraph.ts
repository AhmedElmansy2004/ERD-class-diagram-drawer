import type { GraphResponse } from '../types/graph';

export const mockGraph: GraphResponse = {
  nodes: [
    // entities
    { id: 'emp',       label: 'Employee',   type: 'ENTITY' },
    { id: 'dept',      label: 'Department', type: 'ENTITY' },
    { id: 'dependent', label: 'Dependent',  type: 'WEAK_ENTITY' },

    // relationships
    { id: 'works_in',   label: 'Works_In',      type: 'RELATIONSHIP' },
    { id: 'has_dep',    label: 'Has_Dependent', type: 'IDENTIFYING_RELATIONSHIP' },

    // Employee attributes
    { id: 'emp_ssn',    label: 'SSN',       type: 'ATTRIBUTE',             key: 'PRIMARY_KEY' },
    { id: 'emp_name',   label: 'Name',      type: 'COMPOSITE_ATTRIBUTE',   key: 'NONE' },
    { id: 'emp_first',  label: 'FirstName', type: 'ATTRIBUTE',             key: 'NONE' },
    { id: 'emp_last',   label: 'LastName',  type: 'ATTRIBUTE',             key: 'NONE' },
    { id: 'emp_phone',  label: 'Phone',     type: 'MULTIVALUED_ATTRIBUTE', key: 'NONE' },
    { id: 'emp_age',    label: 'Age',       type: 'DERIVED_ATTRIBUTE',     key: 'NONE' },
    { id: 'emp_salary', label: 'Salary',    type: 'ATTRIBUTE',             key: 'NONE' },

    // Department attributes
    { id: 'dept_id',    label: 'DeptID',   type: 'ATTRIBUTE',             key: 'PRIMARY_KEY' },
    { id: 'dept_name',  label: 'Name',     type: 'ATTRIBUTE',             key: 'NONE' },
    { id: 'dept_loc',   label: 'Location', type: 'MULTIVALUED_ATTRIBUTE', key: 'NONE' },

    // Dependent attributes (weak entity: partial key, not primary)
    { id: 'dep_name',   label: 'DepName',   type: 'ATTRIBUTE', key: 'PARTIAL_KEY' },
    { id: 'dep_birth',  label: 'BirthDate', type: 'ATTRIBUTE', key: 'NONE' },
  ],

  edges: [
    // Employee -> attributes
    { id: 'a1', source: 'emp', target: 'emp_ssn' },
    { id: 'a2', source: 'emp', target: 'emp_name' },
    { id: 'a3', source: 'emp', target: 'emp_phone' },
    { id: 'a4', source: 'emp', target: 'emp_age' },
    { id: 'a5', source: 'emp', target: 'emp_salary' },

    // composite Name -> parts
    { id: 'c1', source: 'emp_name', target: 'emp_first' },
    { id: 'c2', source: 'emp_name', target: 'emp_last' },

    // Department -> attributes
    { id: 'a6', source: 'dept', target: 'dept_id' },
    { id: 'a7', source: 'dept', target: 'dept_name' },
    { id: 'a8', source: 'dept', target: 'dept_loc' },

    // Dependent -> attributes
    { id: 'a9',  source: 'dependent', target: 'dep_name' },
    { id: 'a10', source: 'dependent', target: 'dep_birth' },

    // relationship -> entity, same direction as the mapper
    { id: 'r1', source: 'works_in', target: 'emp',       label: 'N',     participation: 'TOTAL' },
    { id: 'r2', source: 'works_in', target: 'dept',      label: '1',     participation: 'PARTIAL' },
    { id: 'r3', source: 'has_dep',  target: 'emp',       label: '(0,N)', participation: 'PARTIAL' },
    { id: 'r4', source: 'has_dep',  target: 'dependent', label: '(1,1)', participation: 'TOTAL' },
  ],
};