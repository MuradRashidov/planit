import { ACTION, AuditLog } from '@prisma/client'
import React from 'react'

export const generateLogMessage = (log: AuditLog) => {
   const { action, entityTitle, entityType } = log;
   switch (action) {
    case ACTION.CREATE:
    return `created ${entityType.toLocaleLowerCase()} "${entityTitle}"`;

    case ACTION.DELETE:
    return `deleted ${entityType.toLowerCase()} "${entityTitle}"`;

    case ACTION.UPDATE:
    return `updated ${entityType.toLowerCase()} "${entityTitle}"`;

    default:
    return `uncnown action ${entityType.toLowerCase()} "${entityTitle}"`;
   }
}

