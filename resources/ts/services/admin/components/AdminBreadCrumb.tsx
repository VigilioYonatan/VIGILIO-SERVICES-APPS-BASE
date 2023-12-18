interface AdminBreadCrumbProps {
    uris?: { uri: string; title: string }[];
    current: string;
}
function AdminBreadCrumb({ uris, current }: AdminBreadCrumbProps) {
    return (
        <nav
            class="flex text-sm font-semibold text-gray-700 md:ms-2 dark:text-gray-400 dark:hover:text-white capitalize"
            aria-label="Breadcrumb"
        >
            <ol class="inline-flex items-center space-x-1 md:space-x-2 rtl:space-x-reverse">
                <li class="inline-flex items-center">
                    <a
                        href="/admin"
                        class="inline-flex items-center text-sm font-medium text-gray-700 hover:text-blue-600 dark:text-gray-400 dark:hover:text-white"
                    >
                        <i class="fas fa-tachometer-alt me-2.5 text-xs" />
                    </a>
                </li>
                {uris?.map(({ title, uri }) => (
                    <li key={uri}>
                        <div class="flex items-center hover:text-blue-600 ">
                            <i class="fas fa-chevron-right me-2.5 text-xs" />
                            <a
                                href={`/admin${uri}`}
                                class="ms-1"
                                type="button"
                                aria-label={`link ${title}`}
                            >
                                {title}
                            </a>
                        </div>
                    </li>
                ))}
                <li>
                    <div class="flex items-center">
                        <i class="fas fa-chevron-right me-2.5 text-xs" />
                        <span class="ms-1 capitalize">{current}</span>
                    </div>
                </li>
            </ol>
        </nav>
    );
}

export default AdminBreadCrumb;
