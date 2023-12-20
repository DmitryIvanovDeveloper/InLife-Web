export default class TypedResult<Status> {
    constructor(readonly status: Status, readonly data?: any) {}
}
