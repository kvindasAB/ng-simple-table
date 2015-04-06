declare module SimpleTablePlugin {
    /**
     * Interface of plugins with the need to be aware of table config changes
     */
    interface ISimpleTablePluginConfigAware {
        onConfigChanged(): void;
    }
}
