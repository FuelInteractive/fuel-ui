import { ReflectorReader } from 'angular2/src/core/reflection/reflector_reader';
/**
 * The host of the static resolver is expected to be able to provide module metadata in the form of
 * ModuleMetadata. Angular 2 CLI will produce this metadata for a module whenever a .d.ts files is
 * produced and the module has exported variables or classes with decorators. Module metadata can
 * also be produced directly from TypeScript sources by using MetadataCollector in tools/metadata.
 */
export interface StaticReflectorHost {
    /**
     *  Return a ModuleMetadata for the given module.
     *
     * @param moduleId is a string identifier for a module as an absolute path.
     * @returns the metadata for the given module.
     */
    getMetadataFor(moduleId: string): {
        [key: string]: any;
    };
    /**
     * Resolve a module from an import statement form to an absolute path.
     * @param moduleName the location imported from
     * @param containingFile for relative imports, the path of the file containing the import
     */
    resolveModule(moduleName: string, containingFile?: string): string;
}
/**
 * A token representing the a reference to a static type.
 *
 * This token is unique for a moduleId and name and can be used as a hash table key.
 */
export declare class StaticType {
    moduleId: string;
    name: string;
    constructor(moduleId: string, name: string);
}
/**
 * A static reflector implements enough of the Reflector API that is necessary to compile
 * templates statically.
 */
export declare class StaticReflector implements ReflectorReader {
    private host;
    private typeCache;
    private annotationCache;
    private propertyCache;
    private parameterCache;
    private metadataCache;
    constructor(host: StaticReflectorHost);
    importUri(typeOrFunc: any): string;
    /**
     * getStaticType produces a Type whose metadata is known but whose implementation is not loaded.
     * All types passed to the StaticResolver should be pseudo-types returned by this method.
     *
     * @param moduleId the module identifier as an absolute path.
     * @param name the name of the type.
     */
    getStaticType(moduleId: string, name: string): StaticType;
    annotations(type: StaticType): any[];
    propMetadata(type: StaticType): {
        [key: string]: any;
    };
    parameters(type: StaticType): any[];
    private conversionMap;
    private initializeConversionMap();
    private convertKnownDecorator(moduleContext, expression);
    private getDecoratorType(moduleContext, expression);
    private getDecoratorParameter(moduleContext, expression, index);
    private getPropertyMetadata(moduleContext, value);
    private getMemberData(moduleContext, member);
    /**
     * @param module an absolute path to a module file.
     */
    getModuleMetadata(module: string): {
        [key: string]: any;
    };
    private getTypeMetadata(type);
}
