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
    { id: 'emp_ssn',    label: 'SSN',       type: 'KEY_ATTRIBUTE' },
    { id: 'emp_name',   label: 'Name',      type: 'COMPOSITE_ATTRIBUTE' },
    { id: 'emp_first',  label: 'FirstName', type: 'ATTRIBUTE' },
    { id: 'emp_last',   label: 'LastName',  type: 'ATTRIBUTE' },
    { id: 'emp_phone',  label: 'Phone',     type: 'MULTIVALUED_ATTRIBUTE' },
    { id: 'emp_age',    label: 'Age',       type: 'DERIVED_ATTRIBUTE' },
    { id: 'emp_salary', label: 'Salary',    type: 'ATTRIBUTE' },

    // Department attributes
    { id: 'dept_id',    label: 'DeptID',   type: 'KEY_ATTRIBUTE' },
    { id: 'dept_name',  label: 'Name',     type: 'ATTRIBUTE' },
    { id: 'dept_loc',   label: 'Location', type: 'MULTIVALUED_ATTRIBUTE' },

    // Dependent attributes
    { id: 'dep_name',   label: 'DepName',   type: 'KEY_ATTRIBUTE' },
    { id: 'dep_birth',  label: 'BirthDate', type: 'ATTRIBUTE' },
  ],

  edges: [
    // Employee -> attributes
    { id: 'a1', source: 'emp', target: 'emp_ssn',    type: 'ATTRIBUTE_LINK' },
    { id: 'a2', source: 'emp', target: 'emp_name',   type: 'ATTRIBUTE_LINK' },
    { id: 'a3', source: 'emp', target: 'emp_phone',  type: 'ATTRIBUTE_LINK' },
    { id: 'a4', source: 'emp', target: 'emp_age',    type: 'ATTRIBUTE_LINK' },
    { id: 'a5', source: 'emp', target: 'emp_salary', type: 'ATTRIBUTE_LINK' },

    // composite Name -> parts
    { id: 'c1', source: 'emp_name', target: 'emp_first', type: 'ATTRIBUTE_LINK' },
    { id: 'c2', source: 'emp_name', target: 'emp_last',  type: 'ATTRIBUTE_LINK' },

    // Department -> attributes
    { id: 'a6', source: 'dept', target: 'dept_id',   type: 'ATTRIBUTE_LINK' },
    { id: 'a7', source: 'dept', target: 'dept_name', type: 'ATTRIBUTE_LINK' },
    { id: 'a8', source: 'dept', target: 'dept_loc',  type: 'ATTRIBUTE_LINK' },

    // Dependent -> attributes
    { id: 'a9',  source: 'dependent', target: 'dep_name',  type: 'ATTRIBUTE_LINK' },
    { id: 'a10', source: 'dependent', target: 'dep_birth', type: 'ATTRIBUTE_LINK' },

    // Works_In: Employee (total, N) --- Department (partial, 1)
    { id: 'r1', source: 'emp',  target: 'works_in', type: 'RELATIONSHIP_LINK', label: 'N', participation: 'TOTAL' },
    { id: 'r2', source: 'dept', target: 'works_in', type: 'RELATIONSHIP_LINK', label: '1', participation: 'PARTIAL' },

    // Has_Dependent: Employee (partial, min-max) --- Dependent (total, min-max)
    { id: 'r3', source: 'emp',       target: 'has_dep', type: 'RELATIONSHIP_LINK', label: '(0,N)', participation: 'PARTIAL' },
    { id: 'r4', source: 'dependent', target: 'has_dep', type: 'RELATIONSHIP_LINK', label: '(1,1)', participation: 'TOTAL' },
  ],
};