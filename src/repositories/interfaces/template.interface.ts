import { template, variable } from '@prisma/client';

export interface TemplateRepository {
	create(
		data: Partial<template>,
		variables: Partial<variable>[] | null,
	): Promise<template>;
}
